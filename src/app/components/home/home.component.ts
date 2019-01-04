import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { AuthState } from 'src/app/model/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @select()
  auth: Observable<AuthState>;

  constructor() { }

  ngOnInit() {
  }

}
