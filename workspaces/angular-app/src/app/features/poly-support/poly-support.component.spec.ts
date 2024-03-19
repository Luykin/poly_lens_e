import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'expect';
import { TranslateModule } from '@ngx-translate/core';
import { PolySupportComponent } from './poly-support.component';
import { MOCK_PROVIDERS } from 'src/app/mock-providers';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { jest } from '@jest/globals';

describe('PolySupportComponent', () => {
  let component: PolySupportComponent;
  let fixture: ComponentFixture<PolySupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolySupportComponent],
      providers: [MOCK_PROVIDERS],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PolySupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should set application version', () => {
      // Arrange
      jest.spyOn(UtilityService, 'getBuild').mockReturnValue('1.2.3');

      // Act
      component.ngOnInit();

      // Assert
      expect(component.polySupport.appVersion).toBe('1.2.3');
    });
  });

  describe('openSupportPage', () => {
    it('should open support page', () => {
      // Arrange
      const spy = jest.spyOn(UtilityService, 'openExternalBrowser');

      // Act
      component.openSupportPage();

      // Assert
      expect(spy).toHaveBeenCalledWith(
        'https://support.hp.com/contact/product/poly-lens-desktop-and-web-app/2101801767/model/2101801770?source=polydropdown'
      );
    });
  });

  describe('openCommunityPage', () => {
    it('should open community page', () => {
      // Arrange
      const spy = jest.spyOn(UtilityService, 'openExternalBrowser');

      // Act
      component.openCommunityPage();

      // Assert
      expect(spy).toHaveBeenCalledWith('https://h30434.www3.hp.com/');
    });
  });

  describe('openDocumentPage', () => {
    it('should open document page', () => {
      // Arrange
      const spy = jest.spyOn(UtilityService, 'openExternalBrowser');

      // Act
      component.openDocumentPage();

      // Assert
      expect(spy).toHaveBeenCalledWith(
        'https://documents.polycom.com/bundle/poly-lens-da/page/getting-started.html'
      );
    });
  });

  describe('page links', () => {
    it('should render support page link', () => {
      const element = fixture.debugElement.nativeElement.querySelector(
        '#support_visit_poly_link'
      );
      expect(element.textContent).toBe(' SUPPORT.POLY_SUPPORT_LINK ');
    });

    it('should render community page link', () => {
      const element = fixture.debugElement.nativeElement.querySelector(
        '#support_visit_poly_community_link'
      );
      expect(element.textContent).toBe(' SUPPORT.POLY_COMMUNITY_LINK ');
    });

    it('should render document page link', () => {
      const element = fixture.debugElement.nativeElement.querySelector(
        '#support_get_started_link'
      );
      expect(element.textContent).toBe(' SUPPORT.POLY_DOCUMENT_LINK ');
    });
  });

  describe('page informations', () => {
    it('should render tenant id', () => {
      const element = fixture.debugElement.nativeElement.querySelector(
        '#support_tenant_label'
      );
      expect(element.textContent).toBe(' SUPPORT.TENANT_ID ');
    });

    it('should render user id', () => {
      const element = fixture.debugElement.nativeElement.querySelector(
        '#support_user_label'
      );
      expect(element.textContent).toBe(' SUPPORT.USER_ID ');
    });

    it('should render app id', () => {
      const element = fixture.debugElement.nativeElement.querySelector(
        '#support_application_id_label'
      );
      expect(element.textContent).toBe(' SUPPORT.APP_ID ');
    });

    it('should render app version', () => {
      const element = fixture.debugElement.nativeElement.querySelector(
        '#support_software_version_label'
      );
      expect(element.textContent).toBe(' SUPPORT.SOFTWARE_VERSION ');
    });

    it('should not render lens version if visibility is set to false', () => {
      const element = fixture.debugElement.nativeElement.querySelector(
        '#support_lens_system_label'
      );
      expect(element).toBeNull();
    });

    it('should render lens version if visibility is set to true', () => {
      // Arrange
      component.lensServiceVersionVisibility = true;
      const element = fixture.debugElement.nativeElement.querySelector(
        '#support_lens_system_label'
      );
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        // Assert
        expect(element.textContent).toBe(' SUPPORT.LENS_SYSTEM ');
      });
    });

    it('should render last connected', () => {
      const element = fixture.debugElement.nativeElement.querySelector(
        '#support_last_connected_label'
      );
      expect(element.textContent).toBe(' SUPPORT.LAST_CONNECTED ');
    });
  });
});
