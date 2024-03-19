import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LottieModule } from 'ngx-lottie';
import { AppRoutingModule } from './app-routing.module';
import {
  mockPlayerFactory,
  playerFactory,
} from './core/factories/lottie-player.factory';

export const COMMON_MODULES = [
  BrowserAnimationsModule,
  BrowserModule,
  FormsModule,
  HttpClientModule,
  TranslateModule.forRoot(),
];

export const COMMON_APP_MODULES = [
  ...COMMON_MODULES,
  LottieModule.forRoot({ player: playerFactory }),
  AppRoutingModule,
];

export const COMMON_TESTING_MODULES = [
  ...COMMON_MODULES,
  RouterTestingModule,
  HttpClientTestingModule,
  LottieModule.forRoot({ player: mockPlayerFactory }),
];
