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

  userProfileClicked: boolean;
  validUntil: Date;

  constructor(private authActions: AuthActions) {
  }

  ngOnInit() {
  }

  logout() {
    this.authActions.logout();
  }
}
