import { Component, OnInit } from '@angular/core';
import { AuthActions } from 'src/app/model/actions/auth.actions';
import { select } from '@angular-redux/store';
import { AuthState } from 'src/app/model/state';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @select()
  auth: Observable<AuthState>;
  subscription: Subscription;

  infoMessage: string;

  constructor(private authActions: AuthActions, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.auth.subscribe({
      next: data => {
        if (data.isLoggedIn) {
          this.router.navigate(['home']).then(() => this.subscription.unsubscribe());
        }
        this.infoMessage = this.getErrorMessageFrom(data.errorMessage);
      }
    });
  }

  login() {
    this.authActions.login();
  }

  private getErrorMessageFrom(error: string): string {
    if (!error) {
      return '';
    }

    switch (error) {
      case 'popup_closed_by_user':
        return 'You closed the popup before finishing the consent flow.';
      case 'access_denied':
        return 'You denied the permission to the scopes required.';
      case 'popup_blocked_by_browser':
        return 'Your browser blocked the default popup window, please try again.';
      default:
        if (error.match('refresh_')) {
          return `${error.substring(8)}, please log in again, so we can make sure it is you.`;
        }
        return 'There was an internal error while loggin in, please try again.';
    }
  }
}
