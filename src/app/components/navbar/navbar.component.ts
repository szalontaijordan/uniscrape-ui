import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/model/state';
import { AuthActions } from 'src/app/model/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @select()
  auth: Observable<AuthState>;

  validUntil: Date;

  constructor(private authActions: AuthActions) {
  }

  ngOnInit() {
    this.auth.subscribe({
      next: data => {
        if (window['gapi']['auth2']) {
          const newDate = new Date(window['gapi'].auth2.getAuthInstance().currentUser.get().getAuthResponse().expires_at);

          if (newDate.getFullYear() === new Date().getFullYear()) {
            this.validUntil = newDate;
          } else {
            this.validUntil = null;
          }
        }
      }
    });
  }

  logout() {
    this.authActions.logout();
  }
}
