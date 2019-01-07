import { Injectable } from '@angular/core';
import { ActionsObservable, ofType, Epic } from 'redux-observable';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { BookActions } from '../actions/book.actions';
import { BookService } from 'src/app/services/book.service';

@Injectable({
    providedIn: 'root'
})
export class BookEpics {

    constructor(private bookService: BookService) {
    }

    fetchSectionNames = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(BookActions.BOOK_FETCH_SECTION_NAMES),
        mergeMap(action => this.bookService.getSectionTitles().pipe(
            map(payload => ({
                type: BookActions.BOOK_FETCH_SECTION_NAMES_SUCCEEDED,
                payload
            })),
            catchError(payload => of({
                type: BookActions.BOOK_FETCH_SECTION_NAMES_FAILED,
                payload
            }))
        ))
    )

    fetchSection = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(BookActions.BOOK_FETCH_SECTION),
        mergeMap(action => this.bookService.getSection(action.payload).pipe(
            map(payload => ({
                type: BookActions.BOOK_FETCH_SECTION_SUCCEEDED,
                payload
            })),
            catchError(payload => of({
                type: BookActions.BOOK_FETCH_SECTION_FAILED,
                payload
            }))
        ))
    )

}
