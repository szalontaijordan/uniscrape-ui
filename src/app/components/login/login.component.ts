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

  constructor(public authActions: AuthActions, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.auth.subscribe({
      next: data => data.isLoggedIn && this.router.navigate(['home'])
        .then(() => this.subscription.unsubscribe())
    });
  }
}
