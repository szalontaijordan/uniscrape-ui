import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GoogleProfile } from '../model/types/google-profile.type';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private gapi;
  private options = {
    'prompt': 'select_account',
    'scope': 'profile email',
    'ux_mode': 'popup'
  };

  constructor() {
    this.gapi = window['gapi'];
  }

  public async login(): Promise<any> {
    if (!this.gapi.auth2) {
      await this.initAuth2();
    }

    const loginPromise = await this.gapi.auth2.getAuthInstance().signIn(this.options);

    const idToken = loginPromise.getAuthResponse().id_token;
    const profile = loginPromise.getBasicProfile();

    const google = {
      idToken,
      user: {
        name: profile.getName(),
        imageUrl: profile.getImageUrl(),
        email: profile.getEmail()
      }
    };
    localStorage.setItem('google', JSON.stringify(google));

    return google;
  }

  public async logout(): Promise<any> {
    const user = localStorage.getItem('google')['user'];
    localStorage.removeItem('google');

    return { user };
  }

  public me(): Observable<GoogleProfile> {
    const profile = this.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();

    const name = profile.getName();
    const imageUrl = profile.getImageUrl();
    const email = profile.getEmail();

    return of({ name, imageUrl, email});
  }

  private initAuth2(): Promise<void> {
    return new Promise(resolve => this.gapi.load('auth2', () => {
      this.gapi.auth2.init({
        client_id: '695322178173-7c01bp19lh7gjksaskq93i4bs011qtt4.apps.googleusercontent.com',
        scope: 'profile'
      });
      resolve();
    }));
  }

}
