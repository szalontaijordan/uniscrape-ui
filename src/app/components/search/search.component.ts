import { Component, OnInit, HostListener } from '@angular/core';
import { SearchActions } from 'src/app/model/actions/search.actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { SearchState } from 'src/app/model/state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @select()
  search: Observable<SearchState>;

  private prevOffsetY = 0;
  private page = 1;

  constructor(public searchActions: SearchActions) {
  }

  ngOnInit() {
    this.searchActions.recentSearches();
  }

  formatTerm(searchTerm: string): string {
    if (Number(searchTerm)) {
      return 'ISBN: ' + searchTerm;
    }
    return searchTerm;
  }

  @HostListener('window:scroll', [])
  infiniteScroll(): void {
    const isGoingDown = this.prevOffsetY < window.pageYOffset;
    const results = document.querySelector<HTMLDivElement>('.results');
    const diff = Math.abs(window.pageYOffset - results.offsetHeight);

    if (this.page < 50 && isGoingDown && diff <= 1000 && diff >= 0) {
      this.search.pipe(
        map(search => {
          if (!search.isNextPageLoading) {
            this.page++;
            this.searchActions.loadNextPage(this.page);
          }
        })
      ).subscribe().unsubscribe();
    }
    this.prevOffsetY = window.pageYOffset;
  }
}
