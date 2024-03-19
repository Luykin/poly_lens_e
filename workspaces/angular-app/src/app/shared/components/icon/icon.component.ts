import { IconService } from './icon.service';
import { Component, Input } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { LoggingService } from '../../../core/services/logging/logging.service';

@Component({
  selector: 'oz-icon',
  templateUrl: './icon.component.html',
})
export class IconComponent {
  private _iconName: string | undefined;
  private _px = 0;
  private _size = 0.25;
  private _color: string | undefined;
  iconSVG: SafeHtml | undefined;
  style: StylePropertyMap | undefined;

  @Input() set icon(iconName: string) {
    this._iconName = iconName;
    this.prepareSVG();
  }

  @Input() set size(value: number) {
    this._size = value / 4; // Just make the scale start smaller. So a size=1 ends up like 70px.
    this.prepareSVG();
  }

  @Input() set px(value: number) {
    this._px = value;
    this.prepareSVG();
  }

  @Input() set color(value: string) {
    this._color = value;
    this.prepareSVG();
  }

  @Input() offset: { top: string; left: string } | undefined;
  constructor(
    private iconService: IconService,
    private sanitizer: DomSanitizer,
    private loggingService: LoggingService
  ) {
    this.icon = 'question_help_circle';
  }

  private prepareSVG() {
    if (
      !this._iconName ||
      !this.iconService.icons[
        this._iconName as keyof typeof this.iconService.icons
      ]
    ) {
      this.loggingService.warn(
        `oz-icon does not support icon named: ${this._iconName}`
      );
      return;
    }

    const svgString =
      this.iconService.icons[
        this._iconName as keyof typeof this.iconService.icons
      ];

    const naturalWidth = Number(
      this.getSVGAttribute(svgString, 'width').replace('px', '')
    );
    const naturalHeight = Number(
      this.getSVGAttribute(svgString, 'height').replace('px', '')
    );

    let sizedWidth = naturalWidth;
    let sizedHeight = naturalHeight;

    if (this._px) {
      sizedWidth = this._px;
      sizedHeight = (naturalHeight / naturalWidth) * this._px;
    } else {
      sizedWidth = naturalWidth * this._size;
      sizedHeight = naturalHeight * this._size;
    }

    this.style?.set('width', sizedWidth + 'px');
    this.style?.set('height', sizedWidth + 'px');

    let result = svgString
      .replace(/width="(.*?)"/, `width="${sizedWidth}"`)
      .replace(/height="(.*?)"/, `height="${sizedHeight}"`);

    if (this._color) {
      result = result
        .replaceAll(/stroke="(.*?)"/g, (match, $1) =>
          $1 === 'none' ? match : `stroke="${this._color}"`
        )
        .replaceAll(/fill="(.*?)"/g, (match, $1) =>
          $1 === 'none' ? match : `fill="${this._color}"`
        );
    }

    this.iconSVG = this.sanitizer.bypassSecurityTrustHtml(result);
  }

  private getSVGAttribute(svgString: string, att: string) {
    let result = 'none';
    const matches = svgString.match(`${att}="(.*?)"`);
    if (matches && matches.length >= 2) {
      result = matches[1];
    }
    return result;
  }
}
