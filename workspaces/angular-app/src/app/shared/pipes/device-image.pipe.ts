import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { DeviceUI } from '../../core/models/ui/device-ui.model';
import { UtilityService } from '../../core/services/utility/utility.service';
import {
  CatalogFallback,
  catalogAliasTable,
  catalogFallbackData,
} from './catalog-fallback-data';

const NO_DEVICE_IMAGE = './assets/no-device-image.svg';

/**
 * This does not work with AsyncPipe strategy from translate-collection.pipe.ts
 * Thus, using an async pipe until improved.
 *
 * @example {{ device | deviceImage | async }}
 */
@Pipe({
  name: 'deviceImage',
})
export class DeviceImagePipe implements PipeTransform {
  constructor(
    private utility: UtilityService,
    private domSanitizer: DomSanitizer
  ) {}

  async transform(imageURL?: string, device?: DeviceUI): Promise<SafeUrl> {
    if (imageURL) {
      const imageData = await this.loadURL(imageURL);

      if (imageData) {
        return this.domSanitizer.bypassSecurityTrustUrl(imageData);
      }
    }

    // the following block of code is TEMPORARY, more details in catalog-fallback-data.ts
    if (device) {
      // eslint-disable-next-line unicorn/better-regex
      const polyRegExp = /^Poly /i;

      // imageURL not set, fallback to hardcoded data
      let productName = device?.productName;
      productName = catalogAliasTable[productName] || productName;
      productName = productName.replace(polyRegExp, '');

      if (productName === '') {
        return this.domSanitizer.bypassSecurityTrustUrl(NO_DEVICE_IMAGE);
      }

      const productData: CatalogFallback | undefined = this.getProductData(
        polyRegExp,
        productName
      );

      if (productData?.node?.productImages?.edges?.[0]?.node?.url) {
        const imageData = await this.loadURL(
          productData.node.productImages.edges[0].node.url
        );

        if (imageData) {
          return this.domSanitizer.bypassSecurityTrustUrl(imageData);
        }
      }
    }

    return this.domSanitizer.bypassSecurityTrustUrl(NO_DEVICE_IMAGE);
  }

  /**
   * Using HTTP client to create a browser-based request.  This provides multiple benefits:
   * 1. Automatic browser-based caching
   * 2. Responds with prefetched results when available
   * 3. Offline support when an image is prefetched
   * 4. Automatic etag/cache support, or ability to vary refreshes based on request headers
   *
   * This function uses base64 encoding rather than passing the URL, for the simple reason that it is
   * challenging to respond gracefully to image load failures.  There are a variety of methods for this,
   * but sending a base64 encoded image allows this pipe to maintain control of graceful degradation logic.
   * End result: the user never sees a failed image load, even when offline.
   */
  async loadURL(url: string): Promise<string | undefined> {
    let response;
    let image;
    try {
      response = await firstValueFrom(this.utility.request('get', url, 'blob'));
      const arrayBuffer = await response.arrayBuffer();
      image = btoa(
        new Uint8Array(arrayBuffer).reduce((data, byte) => {
          return data + String.fromCodePoint(byte);
        }, '')
      );
    } catch {
      // this could be a 404 or other error; will be logged by this.utility.request, so nothing more to do here
      return;
    }

    const contentType = response.type.toLowerCase();

    return `data:${contentType};base64,${image}`;
  }

  getProductData(
    polyRegExp: RegExp,
    productName: string
  ): CatalogFallback | undefined {
    let productData = catalogFallbackData.find(
      (data) => data.node.name.replace(polyRegExp, '') === productName
    );

    // if no match, try fuzzy searches
    if (!productData) {
      // e.g. "Studio R30 DFU".startsWith("Studio R30")
      productData = catalogFallbackData.find((data) =>
        productName?.startsWith(data.node.name.replace(polyRegExp, ''))
      );
    }

    if (!productData) {
      // e.g. "Voyager 4310 Series".startsWith("Voyager 4310")
      productData = catalogFallbackData.find((data) =>
        data.node.name.replace(polyRegExp, '').startsWith(productName)
      );
    }

    return productData;
  }
}
