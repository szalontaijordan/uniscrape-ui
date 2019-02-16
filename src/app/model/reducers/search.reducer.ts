import { DEFAULT_APP_STATE, SearchState } from '../state';
import { SearchActions } from '../actions/search.actions';
import { Reducer, AnyAction } from 'redux';

export const searchReducer: Reducer<SearchState> = (state: SearchState = DEFAULT_APP_STATE.search, action: AnyAction): SearchState => {
    switch (action.type) {
        case SearchActions.SEARCH_START:
            return {
                ...state,
                searchTerm: action.payload.searchTerm,
                isLoading: true
            };
        case SearchActions.SEARCH_SUCCEEDED:
            return {
                ...state,
                isLoading: false,
                activeTab: action.payload.activeTab,
                isNextPageLoading: false,
                results: {
                    ...state.results,
                    [action.payload.activeTab]: [ ...state.results[action.payload.activeTab], ...action.payload.items ]
                }
            };
        case SearchActions.LOAD_NEXT_PAGE:
            return {
                ...state,
                isNextPageLoading: true
            };
        case SearchActions.SEARCH_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            };
        case SearchActions.SEARCH_RECENT_SEARCHES_START:
            return {
                ...state,
                isLoading: true
            };
        case SearchActions.SEARCH_RECENT_SEARCHES_SUCCEEDED:
            return {
                ...state,
                isLoading: false,
                recent: action.payload
            };
        case SearchActions.SEARCH_RECENT_SEARCHES_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            };
        case SearchActions.SEARCH_UPDATE_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload
            };
        case SearchActions.SEARCH_CHANGE_TAB:
            return {
                ...state,
                activeTab: action.payload,
                isLoading: true
            };
        default:
            return {
                ...state
            };
    }
};
