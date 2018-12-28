import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { DEFAULT_APP_STATE, AppState } from './model/state';
import { AuthEpics } from './model/epics/auth.epic';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { AuthActions } from './model/actions/auth.actions';
import { combineReducers } from 'redux';

import { authReducer } from './model/reducers/auth.reducer';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    HttpClientModule
  ],
  providers: [AuthEpics, AuthActions],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private ngRedux: NgRedux<AppState>, private authEpics: AuthEpics) {
    const epicMiddleware = createEpicMiddleware();

    this.ngRedux.configureStore(combineReducers({ auth: authReducer }), DEFAULT_APP_STATE, [
      createLogger(),
      epicMiddleware
    ]);

    epicMiddleware.run(combineEpics(
      this.authEpics.login,
      this.authEpics.logout
    ));
  }

}
