import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoggingService } from '../logging/logging.service';
import buildInfo from '../../../../../../../buildInfo.json';

export type ELECTRON_ARGUMENT = 'devmode' | 'locale';

/**
 * This service is for general use utility functions that do not fit
 * in another service. As this service grows, similar methods can be
 * segmented into other services.
 */
@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private http: HttpClient, private logger: LoggingService) {}

  /**
   * Make an HTTP request the Angular way, which provides various benefits over fetch.
   * This function can be expanded to include other methods (put, post etc) as needed.
   */
  request(method: 'get', url: string, responseType?: 'json' | 'blob') {
    return this.http.request(method, url, { responseType }).pipe(
      tap({
        next: (data) =>
          this.logger.debug(
            `Performed ${method} with ${url} and responseType ${responseType}`,
            { data }
          ),
        error: (error) =>
          this.logger.error(
            `Could not ${method} ${url} with responseType ${responseType}`,
            error
          ),
      })
    );
  }

  static openExternalBrowser(url: string) {
    window.open(url, '_blank');
  }

  static prepareIdsForAutomationTests(...arguments_: string[]): string {
    const ensureArray = arguments_.length > 0 ? arguments_ : [''];
    const joined = ensureArray.join('_');
    return joined
      .toLowerCase()
      .replaceAll('&', 'and')
      .replaceAll(/[\W_]+/g, '_');
  }

  static scrollToTop(
    classNames: string,
    top = 0,
    behavior: ScrollBehavior = 'smooth'
  ) {
    const element = document.querySelectorAll(classNames)[0];
    element?.scrollTo({
      top,
      behavior,
    });
  }

  static isWindows(): boolean {
    return 'win32' === window.api.platform;
  }

  static isMac(): boolean {
    // currently, only two operating systems are supported, so invert isWindows logic
    return !UtilityService.isWindows();
  }

  /**
   * Add a prefetch tag to load a URL, such as an image.
   * It is up to the calling code to only add one prefetch per URL, per lift of Angular.
   * This is ideal for a service to do, as services are singletons.
   *
   * This assists with initial load of content that may be requested later. Not
   * only does it speed up the request later since it is prefetched, it also
   * enables an offline capability.
   */
  static addPrefetch(url: string) {
    const node = document.createElement('link');
    node.rel = 'prefetch';
    node.href = url;
    document.querySelectorAll('head')[0].append(node);
  }

  /**
   * Try/catch handling for an async function.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async attemptAsync(function_: any, ...arguments_: any[]) {
    try {
      return await function_(...arguments_);
    } catch (error) {
      return error;
    }
  }

  static stringToNumberOrUndefined(
    stringValue: string | undefined
  ): number | undefined {
    return stringValue ? Number.parseInt(stringValue) : undefined;
  }

  static stringToNumberOrZero(stringValue: string | undefined): number {
    return stringValue ? Number.parseInt(stringValue) : 0;
  }

  /**
   * This method was created outside of config.service.ts so that it can be called statically
   * and help avoid circular dependencies.
   */
  static isInTestRunner() {
    // note nodeIntegration is false for builds, so process is only active for testing
    const isJestRunning =
      'object' === typeof process && process.env?.JEST_WORKER_ID !== undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isJasmineAvailable = window && !!(window as any).jasmine;

    return isJestRunning || isJasmineAvailable;
  }

  static async getFullIconPath(
    icon: string,
    iconDirectoryPath: string
  ): Promise<string> {
    // in Angular tests, remote.app.getAppPath() can return a path like:
    // `/Users/cr/Sites/oz-client/node_modules/karma-electron/lib`, which
    // the icon is certainly not in. Thus, remove node_modules/* from path
    const appPath = this.getStringUntil(
      await window.api.getAppPath(),
      'node_modules/'
    );

    return await window.api.pathJoin(appPath, iconDirectoryPath, icon);
  }

  /**
   * Simple utility to get a string's contents until a certain set of strings.
   * Example: string_ of "/this/is/a/really/long/path" and find of "/really" would return "/this/is/a"
   */
  static getStringUntil(string_: string, find: string) {
    if (!string_ || typeof string_ !== 'string') {
      return string_;
    }

    return string_.split(find)[0];
  }

  static isNullOrUndefined(x: unknown) {
    return x === null || x === undefined;
  }

  /**
   * From buildInfo.json file
   *
   * @example "master"
   * @example "develop"
   * @example "363-internationalization"
   */
  static getBuildBranch(): string {
    return buildInfo.branch;
  }

  /**
   * From buildInfo.json file
   * @example "0.1.6-363-internationalization-485857d2"
   */
  static getBuild(): string {
    return buildInfo.build;
  }

  /**
   * From buildInfo.json file
   * @example "0.1.6"
   */
  static getBuildVersion(): string {
    return buildInfo.version;
  }

  /**
   * From buildInfo.json file
   * @example "lens-desktop-mac"
   */
  static getBuildProductId(): string {
    return buildInfo.productId;
  }

  /**
   * From buildInfo.json file
   * @example "363-internationalization"
   */
  static getBuildReleaseChannel(): string {
    return buildInfo.releaseChannel;
  }

  /**
   * From buildInfo.json file
   * @example "com.poly.lens.client.app"
   */
  static getBuildAppId(): string {
    return buildInfo.appId;
  }

  /**
   * From buildInfo.json file
   * @example "485857d2"
   */
  static getBuildCommitId(): string {
    return buildInfo.commitId;
  }

  /**
   * Note if checking for a develop branch, best to use !UtilityService.isBuildBranchMaster(),
   * because there are numerous sub-branches of develop.
   */
  static isBuildBranchMaster(): boolean {
    return 'master' === this.getBuildBranch().toLowerCase();
  }

  /**
   * Check if build branch is release candidate (RC) - name starting with 'rc-'
   */
  static isBuildBranchRC(): boolean {
    return this.getBuildBranch().toLowerCase().startsWith('rc-');
  }

  static getElectronArgument(key: ELECTRON_ARGUMENT, getValue = true) {
    const argument = window.process.argv.find((argument) =>
      argument.includes(`--${key}=`)
    );
    if (!argument) {
      return '';
    }

    let value = argument;
    if (getValue) {
      const parts = argument.split('=');
      value = parts.length > 1 ? parts[1] : argument;
    }

    return value;
  }

  /**
   * A no-op identity function that returns arguments provided.  In V1 -> V2 migration work,
   * this can be used as a placeholder for a function that is in a service or utility class
   * that has not yet been imported.  This way all functions can be searched as well.
   *
   * At the end of V2 migration, this function can be removed when no longer in use.
   */
  identityStub<T extends unknown[]>(...arguments_: T): T {
    this.logger.debug(
      'Identity function called. This is a stub for migration work and should not appear once Lens Desktop 2.0 is mature.',
      { arguments_ }
    );

    return arguments_;
  }
}
