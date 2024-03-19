// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  OpenDialogOptions,
  OpenDialogReturnValue,
  SaveDialogOptions,
  SaveDialogReturnValue,
} from 'electron';
import { Observable, catchError, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  constructor(private translateService: TranslateService) {}

  selectFile(options: OpenDialogOptions): Observable<OpenDialogReturnValue> {
    return from(
      window.api.showOpenDialog({
        ...options,
        title: this.translateService.instant(options.title || ''),
        properties: ['openFile'],
      })
    ).pipe(
      catchError(() => {
        return of({ canceled: true, filePaths: [] });
      })
    );
  }

  selectFileNameAndLocation(
    options: SaveDialogOptions
  ): Observable<SaveDialogReturnValue> {
    return from(
      window.api.showSaveDialog({
        ...options,
        title: this.translateService.instant(options.title || ''),
        filters: [{ name: 'ZIP File', extensions: ['zip'] }],
      })
    ).pipe(
      catchError(() => {
        return of({ canceled: true, filePath: '' });
      })
    );
  }
}
