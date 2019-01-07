import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../model/state';
import { AuthActions } from '../model/actions/auth.actions';
import { GoogleAuthObject } from '../model/types/google-profile.type';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private ngRedux: NgRedux<AppState>, private router: Router, private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const google = JSON.parse(localStorage.getItem('google')) as GoogleAuthObject;

      if (!google || !(typeof google.idToken === 'string')) {
        this.router.navigate(['login']);
        return of(false);
      }

      return this.authService.isTokenValid(google.idToken).pipe(
        map(isValid => {
          if (isValid) {
            if (!this.ngRedux.getState().auth.isLoading && !this.ngRedux.getState().auth.isLoggedIn) {
              this.ngRedux.dispatch({ type: AuthActions.AUTH_LOGIN_SUCCEEDED, payload: google });
            }
            
            this.ngRedux.dispatch({ type: AuthActions.AUTH_LOGIN_REFRESH, payload: google });
            return true;
          }

          this.ngRedux.dispatch({ type: AuthActions.AUTH_LOGOUT });
          this.router.navigate(['login']);
          return false;
        })
      );
  }

}
