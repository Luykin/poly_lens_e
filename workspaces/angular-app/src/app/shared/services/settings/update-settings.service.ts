// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SettingValue } from '../../components/settings/settings-base.component';

export interface UpdateSetting {
  settingName: string;
  value: SettingValue;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateSettingsService {
  private _updateValue = new Subject<UpdateSetting>();

  update(value: UpdateSetting): void {
    this._updateValue.next(value);
  }

  onUpdate$(): Observable<UpdateSetting> {
    return this._updateValue.asObservable();
  }
}
