import { Injectable } from '@angular/core';
import { ActionsObservable, ofType, Epic, StateObservable } from 'redux-observable';
import { map, mergeMap, catchError, filter, debounce } from 'rxjs/operators';
import { of, from, timer } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { SearchActions } from '../actions/search.actions';
import { SearchState } from '../state';

@Injectable({
    providedIn: 'root'
})
export class SearchEpics {

    constructor(private bookService: BookService) {
    }

    search = (action$: ActionsObservable<any>, state$) => action$.pipe(
        ofType(SearchActions.SEARCH_START),
        mergeMap(action => this.bookService.search(action.payload.searchTerm, action.payload.activeTab).pipe(
            map(payload => ({
                type: SearchActions.SEARCH_SUCCEEDED,
                payload
            })),
            catchError(payload => of({
                type: SearchActions.SEARCH_FAILED,
                payload
            }))
        ))
    )

    loadTabIfEmpty = (action$: ActionsObservable<any>, state$) => action$.pipe(
        ofType(SearchActions.SEARCH_CHANGE_TAB),
        map(action => action.payload),
        filter(activeTab => state$.value.search.results[activeTab].length === 0),
        mergeMap(activeTab => this.bookService.search(state$.value.search.searchTerm, activeTab).pipe(
            map(payload => ({
                type: SearchActions.SEARCH_SUCCEEDED,
                payload
            })),
            catchError(payload => of({
                type: SearchActions.SEARCH_FAILED,
                payload
            }))
        ))
    )

    recent = (action$: ActionsObservable<any>, state$) => action$.pipe(
        ofType(SearchActions.SEARCH_RECENT_SEARCHES_START),
        mergeMap(action => this.bookService.getRecentSearches().pipe(
            map(payload => ({
                type: SearchActions.SEARCH_RECENT_SEARCHES_SUCCEEDED,
                payload
            })),
            catchError(payload => of({
                type: SearchActions.SEARCH_RECENT_SEARCHES_SUCCEEDED,
                payload
            }))
        ))
    )

    loadNextPage = (action$: ActionsObservable<any>, state$) => action$.pipe(
        ofType(SearchActions.LOAD_NEXT_PAGE),
        debounce(() => timer(300)),
        mergeMap(action => this.bookService.search(state$.value.search.searchTerm, state$.value.search.activeTab, action.payload).pipe(
            map(payload => ({
                type: SearchActions.SEARCH_SUCCEEDED,
                payload
            })),
            catchError(payload => of({
                type: SearchActions.SEARCH_FAILED,
                payload
            }))
        ))
    )
}
