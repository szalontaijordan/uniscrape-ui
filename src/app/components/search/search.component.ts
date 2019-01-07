import { Component, OnInit } from '@angular/core';
import { SearchActions } from 'src/app/model/actions/search.actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { SearchState } from 'src/app/model/state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @select()
  search: Observable<SearchState>;

  constructor(public searchActions: SearchActions) {
  }

  ngOnInit() {
    this.searchActions.recentSearches();
  }
}
