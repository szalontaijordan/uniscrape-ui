import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  @Output()
  bookSearch: EventEmitter<string> = new EventEmitter();

  @Input()
  searchTerm: string;

  constructor() {
  }

  ngOnInit() {
  }
}
