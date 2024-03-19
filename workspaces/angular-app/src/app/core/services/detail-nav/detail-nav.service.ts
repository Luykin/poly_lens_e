import { Injectable } from '@angular/core';
import { Operator, StateService } from '../../state-management/state.service';
import { AppStateType } from '../../models/state/app-state.model';
import { Observable } from 'rxjs';
import { DetailNavOptions } from '../../models/state/detail-nav-options.model';

@Injectable({
  providedIn: 'root',
})
export class DetailNavService {
  constructor(private state: StateService<AppStateType>) {}

  /**
   * Set the current detail navigation options
   */
  public setDetailNavOptions(options: DetailNavOptions): void {
    this.state.updateEntity$<DetailNavOptions>('detailNavOptions', {
      operator: Operator.PATCH,
      data: { ...options },
    });
  }

  /*
   * Get the current detail navigation options
   */
  public get showDetailNavOptions$(): Observable<DetailNavOptions> {
    return this.state.select$((state) => state.detailNavOptions);
  }

  /**
   * Get the current device heading option
   */
  public get deviceHeading$(): Observable<string> {
    return this.state.select$((state) => state.detailNavOptions.deviceHeading);
  }

  /**
   * Get the current show navigation option
   */
  public get showNav$(): Observable<boolean> {
    return this.state.select$((state) => state.detailNavOptions.showNav);
  }
  /**
   * Get the current show device heading option
   */
  public get showDeviceHeading$(): Observable<boolean> {
    return this.state.select$(
      (state) => state.detailNavOptions.showDeviceHeading
    );
  }
}
