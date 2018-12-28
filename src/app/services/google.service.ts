import { Injectable } from '@angular/core';
import { HelloJSStatic, HelloJSAuthResponse } from 'hellojs';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoogleProfile } from '../model/types/google-profile.type';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private hello: HelloJSStatic;

  constructor() {
    this.hello = window['hello'];
    this.hello.init({
      google: '695322178173-7c01bp19lh7gjksaskq93i4bs011qtt4.apps.googleusercontent.com'
    });
  }

  public login(): Observable<HelloJSAuthResponse> {
    return from(this.hello.login('google', {
      redirect_uri: window.location.href.replace('login', 'home'),
      force: true
    })).pipe(
      map(response => response.authResponse),
    );
  }

  public logout(): Observable<void> {
    return from(this.hello('google').logout());
  }

  public me(): Observable<GoogleProfile> {
    return from(this.hello('google').api('me'));
  }
}
