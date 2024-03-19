import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
	TranslateFakeLoader,
	TranslateLoader,
	TranslateModule,
	TranslateService,
} from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { expect } from 'expect';
import { MultiplesComponent } from './multiples.component';
import { ElectronIpcService } from '../../services/electron-ipc/electron-ipc.service';

describe('MultiplesComponent', () => {
	const mockElectronIpcService = { receive: jest.fn(), send: jest.fn() };
	jest.spyOn(mockElectronIpcService, 'receive');
	jest.spyOn(mockElectronIpcService, 'send');

	let fixture: ComponentFixture<MultiplesComponent>;
	let component: MultiplesComponent;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [MultiplesComponent],
			imports: [
				ReactiveFormsModule,
				TranslateModule,
				TranslateModule.forRoot({
					loader: {
						provide: TranslateLoader,
						useClass: TranslateFakeLoader,
					},
				}),
			],
			providers: [
				TranslateService,
				{
					provide: ElectronIpcService,
					useValue: mockElectronIpcService,
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MultiplesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
