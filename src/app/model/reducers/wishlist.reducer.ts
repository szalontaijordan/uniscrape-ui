import { DEFAULT_APP_STATE, WishlistState } from '../state';
import { WishlistActions } from '../actions/wishlist.actions';
import { Reducer, AnyAction } from 'redux';

export const wishlistReducer: Reducer<WishlistState> = (state: WishlistState = DEFAULT_APP_STATE.wishlist,
    action: AnyAction): WishlistState => {
    switch (action.type) {
        case WishlistActions.ADD_TO_WISHLIST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case WishlistActions.UPDATE_WISHLIST_FAILED:
        case WishlistActions.FETCH_WISHLIST_FAILED: {
            return {
                ...state,
                isLoading: false
            };
        }
        case WishlistActions.FETCH_WISHLIST_SUCCEEDED: {
            return {
                ...state,
                isLoading: false,
                items: action.payload
            };
        }
        case WishlistActions.UPDATE_WISHLIST_SUCCEEDED: {
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        }
        case WishlistActions.REMOVE_FROM_WISHLIST_SUCCEEDED: {
            return {
                ...state,
                items: state.items.filter(item => item.ISBN !== action.payload.ISBN)
            };
        }
        case WishlistActions.HIDE_DEPOSITORY_LOGIN: {
            return {
                ...state,
                isLoggedInToBookDepository: true
            };
        }
        case WishlistActions.SHOW_DEPOSITORY_LOGIN: {
            return {
                ...state,
                isLoggedInToBookDepository: false
            };
        }
        case WishlistActions.FETCH_DEPOSITORY_WISHLIST: {
            return {
                ...state,
                depositoryWishlist: {
                    ...state.depositoryWishlist,
                    isLoading: true
                }
            };
        }
        case WishlistActions.FETCH_DEPOSITORY_WISHLIST_SUCCEEDED: {
            return {
                ...state,
                depositoryWishlist: {
                    isLoading: false,
                    items: action.payload,
                    error: ''
                }
            };
        }
        case WishlistActions.FETCH_DEPOSITORY_WISHLIST_FAILED: {
            return {
                ...state,
                depositoryWishlist: {
                    error: action.payload.message,
                    ...state.depositoryWishlist
                }
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
