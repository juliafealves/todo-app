import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

/**
 * Configuration Firebase in Angular.
 */
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';

let config = {
    apiKey: "AIzaSyCdZm0WxMCXq9BF64ZHRsAEPjmmSQm4a9k",
    authDomain: "todo-app-490e0.firebaseapp.com",
    databaseURL: "https://todo-app-490e0.firebaseio.com",
    projectId: "todo-app-490e0",
    storageBucket: "todo-app-490e0.appspot.com",
    messagingSenderId: "906447962566"
};

@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(config),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
    ]
})
export class AppModule {
}
