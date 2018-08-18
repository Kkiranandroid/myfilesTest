import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { loginconfirmation } from '../pages/loginconfirmation/loginconfirmation';
import { login } from '../pages/login/login';
import { signup } from '../pages/signup/signup';
import { otp } from '../pages/otp/otp';
import { redeem } from '../pages/redeem/redeem';
import { redeemdetails } from '../pages/redeemdetails/redeemdetails';
import { viewcards } from '../pages/viewcards/viewcards';
import { usage } from '../pages/usage/usage';
import { viewcardsdetails } from '../pages/viewcardsdetails/viewcardsdetails';
import { notifications } from '../pages/notifications/notifications';
import { addnotifications } from '../pages/addnotifications/addnotifications';
import { myprofile } from '../pages/myprofile/myprofile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserdetailsProvider } from '../providers/userdetails/userdetails';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { FCM } from '@ionic-native/fcm';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';


import { FilterPage } from '../pages/filter/filter';
import { LoginpagePage } from '../pages/loginpage/loginpage';
import { Diagnostic } from '@ionic-native/diagnostic';
import { redeemsuccess } from '../pages/redeemsuccess/redeemsuccess';

import { LongPressModule } from 'ionic-long-press';
import { Vibration } from '@ionic-native/vibration';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SharesuccessPage } from '../pages/sharesuccess/sharesuccess';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { Network } from '@ionic-native/network';
import { ResetPage } from '../pages/reset/reset';
import { ConfirmPage } from '../pages/confirm/confirm';
import { dashboard } from '../pages/dashboard/dashboard';
import { sendcloopcoins } from '../pages/sendcloopcoins/sendcloopcoins';
import { coopCardCoins } from '../pages/coopCardCoins/coopCardCoins';
import { coindetails } from '../pages/coindetails/coindetails';
import { merchantDetails } from '../pages/merchantDetails/merchantDetails';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
  MyApp,
	loginconfirmation,
  login,
	signup,
	otp,
	redeem,
	redeemdetails,
	viewcards,
	usage,
	viewcardsdetails,
	notifications,
	addnotifications,
	myprofile,
  dashboard,
	FilterPage,
	redeemsuccess,
  LoginpagePage,
  TutorialPage,
  SharesuccessPage,
  ResetPage,
  sendcloopcoins,
  coindetails,
  coopCardCoins,
  merchantDetails,
  ConfirmPage
  ],
  imports: [
  HttpModule,
  LongPressModule,
  TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
  BrowserModule,
	NgxQRCodeModule,
  IonicModule.forRoot(MyApp,{
		backButtonText: '',	
	}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
	loginconfirmation,
  login,
	signup,
	otp,
	redeem,
	redeemdetails,
	viewcards,
	usage,
	viewcardsdetails,
	notifications,
	addnotifications,
	myprofile,
  dashboard,
	FilterPage,
	redeemsuccess,
  LoginpagePage,
  TutorialPage,
  SharesuccessPage,
  ResetPage,
  sendcloopcoins,
  coopCardCoins,
  merchantDetails,
  coindetails,
  ConfirmPage
  ],
  providers: [
  Network,
  CallNumber,
  SocialSharing,
  AndroidPermissions,
  Vibration,
  StatusBar,
  SplashScreen,
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  UserdetailsProvider,
  DatePipe,
	FCM,
	BarcodeScanner,
	UniqueDeviceID,
	Diagnostic
  ]
})
export class AppModule {}
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}