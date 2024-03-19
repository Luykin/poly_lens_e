import log from 'electron-log/main';

export class Logger {
  public static error(message: string, ...meta: any[]): void {
    log.error(message, meta);
  }

  public static warn(message: string, ...meta: any[]): void {
    log.warn(message, meta);
  }

  public static info(message: string, ...meta: any[]): void {
    log.info(message, meta);
  }

  public static http(message: string, ...meta: any[]): void {
    log.log(message, meta);
  }

  public static verbose(message: string, ...meta: any[]): void {
    log.log(message, meta);
  }

  public static debug(message: string, ...meta: any[]): void {
    log.debug(message, meta);
  }

  public static silly(message: string, ...meta: any[]): void {
    log.log(message, meta);
  }
}
