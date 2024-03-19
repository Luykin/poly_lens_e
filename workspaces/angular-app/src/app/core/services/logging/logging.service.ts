import { Injectable } from '@angular/core';
import log from 'electron-log/renderer';

/**
 * Basic logging service. Will likely add DataDog integration in the future.
 */
@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor() {}

  log(...parameters: any[]) {
    this.info(...parameters);
  }

  info(...parameters: any[]) {
    log.info(...parameters);
  }

  error(...parameters: any[]) {
    log.error(...parameters);
  }

  warn(...parameters: any[]) {
    log.warn(...parameters);
  }

  /**
   * This method does not report to Datadog.
   */
  debug(...parameters: any[]) {
    log.log(parameters);
  }

  saveLogFile(downloadPath: string) {
    return window.api.downloadLogs(downloadPath);
  }
}
