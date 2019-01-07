import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../state';

@Injectable({
  providedIn: 'root'
})
export class AuthActions {

  constructor(private ngRedux: NgRedux<AppState>) {
  }

  static AUTH_LOGIN_STARTED = 'AUTH_LOGIN_STARTED';
  static AUTH_LOGIN_REFRESH = 'AUTH_LOGIN_REFRESH';
  static AUTH_LOGIN_REFRESH_SUCCEEDED = 'AUTH_LOGIN_REFRESH_SUCCEEDED';
  static AUTH_LOGIN_REFRESH_FAILED = 'AUTH_LOGIN_REFRESH_FAILED';
  static AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED';
  static AUTH_LOGIN_SUCCEEDED = 'AUTH_LOGIN_SUCCEEDED';
  static AUTH_LOGOUT = 'AUTH_LOGOUT';
  static AUTH_LOGOUT_SUCCEEDED = 'AUTH_LOGOUT_SUCCEEDED';

  login(stayLoggedIn = false): void {
    this.ngRedux.dispatch({ type: AuthActions.AUTH_LOGIN_STARTED, payload: stayLoggedIn });
  }

  logout(): void {
    this.ngRedux.dispatch({ type: AuthActions.AUTH_LOGOUT });
  }

  refresh(): void {
    this.ngRedux.dispatch({ type: AuthActions.AUTH_LOGIN_REFRESH });
  }
}
