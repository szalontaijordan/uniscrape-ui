import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NgRedux, select } from '@angular-redux/store';
import { AppState, WishlistState } from '../model/state';
import { AuthActions } from '../model/actions/auth.actions';
import { GoogleAuthObject } from '../model/types/google-profile.type';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { WishlistActions } from '../model/actions/wishlist.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  @select() wishlist: Observable<WishlistState>;

  constructor(private ngRedux: NgRedux<AppState>,
              private router: Router,
              private authService: AuthService,
              private authActions: AuthActions,
              private wishlistActions: WishlistActions) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const google = JSON.parse(localStorage.getItem('google')) as GoogleAuthObject;
      const { auth } = this.ngRedux.getState();

      if (!google || !(typeof google.idToken === 'string')) {
        this.router.navigate(['login']);
        return of(false);
      }

      this.wishlist.subscribe({
        next: wishlist => {
          if (!wishlist.items) {
            this.wishlistActions.fetchWishlist();
          }
        }
      }).unsubscribe();

      return this.authService.isTokenValid(google.idToken).pipe(
        map(isValid => {
          if (isValid) {
            if (!auth.isLoading && !this.ngRedux.getState().auth.isLoggedIn) {
              this.authActions.loginSucceeded(google);
            }

            this.authActions.loginRefresh(google);
            return true;
          }

          this.authActions.logout();
          this.router.navigate(['login']);
          return false;
        })
      );
  }

}
