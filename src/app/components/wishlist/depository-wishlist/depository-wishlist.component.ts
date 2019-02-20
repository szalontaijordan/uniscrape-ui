import { Component, OnInit, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthActions } from 'src/app/model/actions/auth.actions';

@Component({
  selector: 'app-depository-wishlist',
  templateUrl: './depository-wishlist.component.html',
  styleUrls: ['./depository-wishlist.component.scss']
})
export class DepositoryWishlistComponent implements OnInit {

  @Input()
  isLoggedInToBookDepository: boolean;

  @Input()
  isBookDepositoryLoginLoading: boolean;

  model = {
    email: '',
    password: ''
  };
  isShowPassword = false;

  constructor(public ngxSmartModalService: NgxSmartModalService, public authActions: AuthActions) {
  }

  ngOnInit() {
  }

  signIn(): void {
    this.authActions.depositoryLogin(this.model);
  }
}
