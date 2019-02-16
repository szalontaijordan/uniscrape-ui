import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../state';

@Injectable({
    providedIn: 'root'
})
export class SearchActions {

    constructor(private ngRedux: NgRedux<AppState>) {
    }

    static SEARCH_START = 'SEARCH_STARTED';
    static SEARCH_SUCCEEDED = 'SEARCH_SUCCEEDED';
    static SEARCH_FAILED = 'SEARCH_FAILED';

    static SEARCH_RECENT_SEARCHES_START = 'SEARCH_RECENT_SEARCHES_STARTED';
    static SEARCH_RECENT_SEARCHES_SUCCEEDED = 'SEARCH_RECENT_SEARCHES_SUCCEEDED';
    static SEARCH_RECENT_SEARCHES_FAILED = 'SEARCH_RECENT_SEARCHES_FAILED';

    static SEARCH_UPDATE_SEARCH_TERM = 'SEARCH_UPDATE_SEARCH_TERM';
    static SEARCH_CHANGE_TAB = 'SEARCH_CHANGE_TAB';

    static LOAD_NEXT_PAGE = 'LOAD_NEXT_PAGE';

    searchStart(searchTerm: string, activeTab = 'depository'): void {
        this.ngRedux.dispatch({ type: SearchActions.SEARCH_START, payload: { searchTerm, activeTab } });
    }

    recentSearches(): void {
        this.ngRedux.dispatch({ type: SearchActions.SEARCH_RECENT_SEARCHES_START });
    }

    updateSearchTerm(newSearchTerm: string): void {
        this.ngRedux.dispatch({ type: SearchActions.SEARCH_UPDATE_SEARCH_TERM, payload: newSearchTerm });
    }

    changeTab(newTab: string): void {
        this.ngRedux.dispatch({ type: SearchActions.SEARCH_CHANGE_TAB, payload: newTab});
    }

    loadNextPage(page: number): void {
        this.ngRedux.dispatch({ type: SearchActions.LOAD_NEXT_PAGE, payload: page });
    }
}
