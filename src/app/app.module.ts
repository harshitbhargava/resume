import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { DetailsPage } from '../pages/details/details';
import { TemplatePage } from '../pages/template/template';
import { LoginPage } from '../pages/login/login';
import { FormPage } from '../pages/form/form';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {File} from '@ionic-native/file';
import {FileOpener} from '@ionic-native/file-opener';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireAuthModule } from 'angularfire2/auth';

// const firebase={
  
//     apiKey: "AIzaSyCSqb6x3GzyiX7AwofqcXk8ztQ4z-6tPO8",
//     authDomain: "resume-5cfad.firebaseapp.com",
//     databaseURL: "https://resume-5cfad.firebaseio.com",
//     projectId: "resume-5cfad",
//     storageBucket: "resume-5cfad.appspot.com",
//     messagingSenderId: "324788101960"
// }
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    SignupPage,
    TemplatePage,
    LoginPage,
    FormPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // AngularFireModule.initializeApp(firebase),
    // AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    SignupPage,
    DetailsPage,
    TemplatePage,
    LoginPage,
    FormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileOpener,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
