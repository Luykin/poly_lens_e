import { jest } from '@jest/globals';
import { expect } from 'expect';

import { SettingInfoLinkModalComponent } from './setting-info-link.component';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';
import {
  MODAL_CLOSE_TYPE,
  MODAL_ID_SETTING_INFO,
} from 'src/app/utilities/constants';

describe('SettingInfoLinkModalComponent', () => {
  let component: SettingInfoLinkModalComponent;
  let ngxSmartModalService: Partial<NgxSmartModalService>;

  beforeEach(() => {
    ngxSmartModalService = {
      getModal: jest.fn(() => {}) as unknown as (
        id: string
      ) => NgxSmartModalComponent,
      close: jest.fn(() => true), // Mock close method to return a boolean
      setModalData: jest.fn((_data: unknown, _id: string) => true), // Mock setModalData method to return a boolean
      // Add other methods here if needed
    };

    component = new SettingInfoLinkModalComponent(
      ngxSmartModalService as NgxSmartModalService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngAfterViewInit should call getModal', () => {
    const spy = jest.spyOn(ngxSmartModalService, 'getModal');
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalledWith(MODAL_ID_SETTING_INFO);
  });

  it('close should call ngxSmartModalService.close', () => {
    const spy = jest.spyOn(ngxSmartModalService, 'close');
    component.close();
    expect(spy).toHaveBeenCalledWith(MODAL_ID_SETTING_INFO);
  });

  it('confirm should set modal data and call close', () => {
    const setModalDataSpy = jest.spyOn(ngxSmartModalService, 'setModalData');
    const closeSpy = jest.spyOn(component, 'close');
    component.confirm();
    expect(setModalDataSpy).toHaveBeenCalledWith(
      { closeModalType: MODAL_CLOSE_TYPE.CONFIRM },
      MODAL_ID_SETTING_INFO,
      true
    );
    expect(closeSpy).toHaveBeenCalled();
  });
});
