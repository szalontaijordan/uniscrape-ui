import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-results-tab',
  templateUrl: './search-results-tab.component.html',
  styleUrls: ['./search-results-tab.component.scss']
})
export class SearchResultsTabComponent implements OnInit {

  @Input()
  items: Array<any>;

  @Input()
  isLoading: boolean;

  @Input()
  isNextPageLoading: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
