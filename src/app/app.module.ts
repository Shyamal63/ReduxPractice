import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NgRedux, DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import { IAppState } from './model';
import { friendReducer } from './reducer';
import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { FriendEpic } from './epic';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgReduxModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FriendEpic,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})


export class AppModule {


  constructor( public store: NgRedux<IAppState>, public fepic:FriendEpic)
    {
      let rootReducer = combineReducers({
        friend_list:friendReducer
      });

      store.configureStore(rootReducer,{},[createLogger(),createEpicMiddleware(fepic.getFriendList)]);

    }


}
