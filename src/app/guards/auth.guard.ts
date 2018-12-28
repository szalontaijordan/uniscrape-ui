import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../model/state';
import { AuthActions } from '../model/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private ngRedux: NgRedux<AppState>, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const google = localStorage.getItem('google');

      if (this.ngRedux.getState().auth.isLoggedIn) {
        return true;
      }

      if (google) {
        this.ngRedux.dispatch({ type: AuthActions.AUTH_LOGIN_SUCCEEDED, payload: JSON.parse(google) });
        return true;
      }

      this.router.navigate(['login']);
      return false;
  }
}
