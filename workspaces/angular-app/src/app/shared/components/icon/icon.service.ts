import { Injectable } from '@angular/core';
import { icons } from './icon.constants';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor() {}

  get icons(): { [id in keyof typeof icons]: string } {
    return icons;
  }
}
