import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';

import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyAv85O55WcgVEXgWUTr5GVqspI__ywOSn4",
  authDomain: "runningclub-46ede.firebaseapp.com",
  databaseURL: "https://runningclub-46ede.firebaseio.com",
  projectId: "runningclub-46ede",
  storageBucket: "runningclub-46ede.appspot.com",
  messagingSenderId: "248528881431",
  appId: "1:248528881431:web:efbea0811a4460f39f5952",
  measurementId: "G-X04V0DEYV3"
}; 

firebase.initializeApp(firebaseConfig)

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
