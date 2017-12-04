import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule }      from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GetPnrPage } from '../pages/get-pnr/get-pnr';
import {SelectRoutePage} from '../pages/select-route/select-route';
import {SelectCabRoutePage} from '../pages/select-cab-route/select-cab-route';
import {SelectRoute1Page} from '../pages/select-route1/select-route1';
import {SelectRoute2Page} from '../pages/select-route2/select-route2';
import {ConfirmRoutePage} from '../pages/confirm-route/confirm-route';
import {GoogleplaceDirective} from './mapsautocomplete.directive';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SelectRoutePage,
    GetPnrPage,
    SelectCabRoutePage,
    GoogleplaceDirective,
    SelectRoute1Page,
    SelectRoute2Page,
    ConfirmRoutePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),HttpModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SelectCabRoutePage,
    GetPnrPage,
    HomePage,
    SelectRoutePage,
    SelectRoute1Page,
    SelectRoute2Page,
    ConfirmRoutePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IonicStorageModule
  ]
})
export class AppModule {}
