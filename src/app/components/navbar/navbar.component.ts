import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/model/state';
import { AuthActions } from 'src/app/model/actions/auth.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @select()
  auth: Observable<AuthState>;

  userProfileClicked: boolean;
  validUntil: Date;

  constructor(private authActions: AuthActions) {
  }

  ngOnInit(): void {
    this.authActions.subscriptionCheck();
  }

  logout(): void {
    this.authActions.logout();
  }

  toggleSubscription(): boolean {
    this.auth.pipe(
      map(auth => {
        const email = auth.currentUser.email;
        if (!auth.isSubscribedToWatcher) {
          this.authActions.subscribeToWatcher(email);
        } else {
          this.authActions.unSubscribeFromWatcher(email);
        }
      })
    ).subscribe().unsubscribe();
    return false;
  }
}
