import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../state';
import { GoogleAuthObject } from '../types/google-profile.type';

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

  static DEPOSITORY_LOGIN = 'DEPOSITORY_LOGIN';
  static DEPOSITORY_LOGIN_SUCCEDED = 'DEPOSITORY_LOGIN_SUCCEDED';
  static DEPOSITORY_LOGIN_FAILED = 'DEPOSITORY_LOGIN_FAILED';

  static DEPOSITORY_CHECK_AUTH = 'DEPOSITORY_CHECK_AUTH';

  static DEPOSITOR_LOGOUT = 'DEPOSITORY_LOGOUT';
  static DEPOSITOR_LOGOUT_SUCCEEDED = 'DEPOSITOR_LOGOUT_SUCCEEDED';

  static WATCHER_SUBSCRIPTION_CHECK = 'WATCHER_SUBSCRIPTION_CHECK';
  static WATCHER_SUBSCRIPTION_CHECK_SUCCEEDED = 'WATCHER_SUBSCRIPTION_CHECK_SUCCEEDED';

  static WATCHER_SUBSCRIPTION_SUBSCRIBE = 'WATCHER_SUBSCRIPTION_SUBSCRIBE';
  static WATCHER_SUBSCRIPTION_SUBSCRIBE_SUCCEEDED = 'WATCHER_SUBSCRIPTION_SUBSCRIBE_SUCCEEDED';
  static WATCHER_SUBSCRIPTION_UNSUBSCRIBE = 'WATCHER_SUBSCRIPTION_UNSUBSCRIBE';
  static WATCHER_SUBSCRIPTION_UNSUBSCRIBE_SUCCEEDED = 'WATCHER_SUBSCRIPTION_UNSUBSCRIBE_SUCCEEDED';

  login(stayLoggedIn = false): void {
    this.ngRedux.dispatch({ type: AuthActions.AUTH_LOGIN_STARTED, payload: stayLoggedIn });
  }

  loginSucceeded(google: GoogleAuthObject): void {
    this.ngRedux.dispatch({ type: AuthActions.AUTH_LOGIN_SUCCEEDED, payload: google });
  }

  loginRefresh(google: GoogleAuthObject): void {
    this.ngRedux.dispatch({ type: AuthActions.AUTH_LOGIN_REFRESH, payload: google });
  }

  logout(): void {
    this.ngRedux.dispatch({ type: AuthActions.AUTH_LOGOUT });
  }

  depositoryLogin(credentials: { email: string, password: string }): void {
    this.ngRedux.dispatch({ type: AuthActions.DEPOSITORY_LOGIN, payload: credentials });
  }

  depositoryLogout(): void {
    this.ngRedux.dispatch({ type: AuthActions.DEPOSITOR_LOGOUT });
  }

  depositoryCheckAuth(): void {
    this.ngRedux.dispatch({ type: AuthActions.DEPOSITORY_CHECK_AUTH });
  }

  subscriptionCheck(): void {
    this.ngRedux.dispatch({ type: AuthActions.WATCHER_SUBSCRIPTION_CHECK });
  }

  subscribeToWatcher(email: string): void {
    this.ngRedux.dispatch({ type: AuthActions.WATCHER_SUBSCRIPTION_SUBSCRIBE, payload: email });
  }

  unSubscribeFromWatcher(email: string): void {
    this.ngRedux.dispatch({ type: AuthActions.WATCHER_SUBSCRIPTION_UNSUBSCRIBE, payload: email });
  }
}
