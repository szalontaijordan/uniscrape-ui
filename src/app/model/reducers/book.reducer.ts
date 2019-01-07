import { DEFAULT_APP_STATE, AuthState, HomeState } from '../state';
import { BookActions } from '../actions/book.actions';
import { Reducer, AnyAction } from 'redux';

export const bookReducer: Reducer<HomeState> = (state: HomeState = DEFAULT_APP_STATE.home, action: AnyAction): HomeState => {
    switch (action.type) {
        case BookActions.BOOK_FETCH_SECTION_NAMES:
            return {
                ...state,
                isLoading: true
            };
        case BookActions.BOOK_FETCH_SECTION:
            const tmpBookSections = state.bookSections
                .filter(section => section.name !== action.payload.name)
                .concat({ name: action.payload, items: [] });

            return {
                ...state,
                isLoading: true,
                bookSections: tmpBookSections
            };    
        case BookActions.BOOK_FETCH_SECTION_NAMES_SUCCEEDED:
            return {
                ...state,
                sectionNames: action.payload
            };
        case BookActions.BOOK_FETCH_SECTION_NAMES_FAILED:
            return {
                ...state,
                errorMessage: action.payload.message
            };
        case BookActions.BOOK_FETCH_SECTION_SUCCEEDED:
            const newBookSections = state.bookSections
                .filter(section => section.name !== action.payload.name)
                .concat(action.payload);

            return {
                ...state,
                bookSections: newBookSections
            }
        default:
            return {
                ...state
            };
    }
};
