import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../state';

@Injectable({
    providedIn: 'root'
})
export class WishlistActions {

    static FETCH_WISHLST = 'FETCH_WISHLIST';
    static FETCH_WISHLIST_SUCCEEDED = 'FETCH_WISHLIST_SUCCEEDED';

    static ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
    static REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
    static REMOVE_FROM_WISHLIST_SUCCEEDED = 'REMOVE_FROM_WISHLIST_SUCCEEDED';

    static UPDATE_WISHLIST_SUCCEEDED = 'UPDATE_WISHLIST_SUCCEEDED';
    static UPDATE_WISHLIST_FAILED = 'UPDATE_WISHLIST_FAILED';
    static FETCH_WISHLIST_FAILED = 'FETCH_WISHLIST_FAILED';

    static HIDE_DEPOSITORY_LOGIN = 'HIDE_DEPOSITORY_LOGIN';
    static SHOW_DEPOSITORY_LOGIN = 'SHOW_DEPOSITORY_LOGIN';

    static FETCH_DEPOSITORY_WISHLIST = 'FETCH_DEPOSITORY_WISHLIST';
    static FETCH_DEPOSITORY_WISHLIST_SUCCEEDED = 'FETCH_DEPOSITORY_WISHLIST_SUCCEEDED';
    static FETCH_DEPOSITORY_WISHLIST_FAILED = 'FETCH_DEPOSITORY_WISHLIST_FAILED';

    constructor(private ngRedux: NgRedux<AppState>) {
    }

    fetchWishlist(): void {
        this.ngRedux.dispatch({ type: WishlistActions.FETCH_WISHLST });
    }

    addItemToWishlist(bookItem: any): void {
        this.ngRedux.dispatch({ type: WishlistActions.ADD_TO_WISHLIST, payload: bookItem });
    }

    removeItemFromWishlist(bookItem: any): void {
        this.ngRedux.dispatch({ type: WishlistActions.REMOVE_FROM_WISHLIST, payload: bookItem });
    }

    hideDepositoryLogin(): void {
        this.ngRedux.dispatch({ type: WishlistActions.HIDE_DEPOSITORY_LOGIN });
    }

    showDepositoryLogin(): void {
        this.ngRedux.dispatch({ type: WishlistActions.SHOW_DEPOSITORY_LOGIN });
    }

    fetchDepositoryWishlist(): void {
        this.ngRedux.dispatch({ type: WishlistActions.FETCH_DEPOSITORY_WISHLIST });
    }
}
