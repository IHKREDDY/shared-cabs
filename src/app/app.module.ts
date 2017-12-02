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
import {GoogleplaceDirective} from './mapsautocomplete.directive';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SelectRoutePage,
    GetPnrPage,
    SelectCabRoutePage,
    GoogleplaceDirective
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
    SelectRoutePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IonicStorageModule
  ]
})
export class AppModule {}
