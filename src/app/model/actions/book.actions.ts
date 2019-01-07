import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../state';

@Injectable({
    providedIn: 'root'
})
export class BookActions {

    constructor(private ngRedux: NgRedux<AppState>) {
    }

    static BOOK_FETCH_SECTION_NAMES = 'BOOK_FETCH_SECTION_NAMES';
    static BOOK_FETCH_SECTION_NAMES_SUCCEEDED = 'BOOK_FETCH_SECTION_NAMES_SUCCEEDED';
    static BOOK_FETCH_SECTION_NAMES_FAILED = 'BOOK_FETCH_SECTION_NAMES_FAILED';

    static BOOK_FETCH_SECTION = 'BOOK_FETCH_SECTION';
    static BOOK_FETCH_SECTION_SUCCEEDED = 'BOOK_FETCH_SECTION_SUCCEEDED';
    static BOOK_FETCH_SECTION_FAILED = 'BOOK_FETCH_SECTION_FAILED';

    fetchSectionNames(): void {
        this.ngRedux.dispatch({ type: BookActions.BOOK_FETCH_SECTION_NAMES });
    }

    fetchSection(name: string) {
        this.ngRedux.dispatch({ type: BookActions.BOOK_FETCH_SECTION, payload: name });
    }
}
