import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WishlistState, AuthState } from 'src/app/model/state';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  @select()
  wishlist: Observable<WishlistState>;

  @select()
  auth: Observable<AuthState>;

  constructor() {
  }

  ngOnInit() {
  }

}
