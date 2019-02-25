import { Injectable } from '@angular/core';
import { ActionsObservable, ofType, Epic } from 'redux-observable';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { WishlistActions } from '../actions/wishlist.actions';
import { WishlistService } from 'src/app/services/wishlist.service';

@Injectable({
    providedIn: 'root'
})
export class WishlistEpics {

    constructor(private wishlistService: WishlistService) {
    }

    fetchWishlist = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(WishlistActions.FETCH_WISHLST),
        mergeMap(action => this.wishlistService.fetchWishlist().pipe(
            map(payload => ({
                type: WishlistActions.FETCH_WISHLIST_SUCCEEDED,
                payload
            })),
            catchError(payload => of({
                type: WishlistActions.FETCH_WISHLIST_FAILED,
                payload
            }))
        ))
    )

    addItemToWishlist = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(WishlistActions.ADD_TO_WISHLIST),
        mergeMap(action => this.wishlistService.addItemToWishlist(action.payload).pipe(
            map(payload => ({
                type: WishlistActions.UPDATE_WISHLIST_SUCCEEDED,
                payload
            })),
            catchError(payload => of({
                type: WishlistActions.UPDATE_WISHLIST_SUCCEEDED,
                payload
            }))
        ))
    )

    removeItemFromWishlist = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(WishlistActions.REMOVE_FROM_WISHLIST),
        mergeMap(action => this.wishlistService.removeItemFromWishlist(action.payload).pipe(
            map(() => ({
                type: WishlistActions.REMOVE_FROM_WISHLIST_SUCCEEDED,
                payload: action.payload
            })),
            catchError(payload => of({
                type: WishlistActions.UPDATE_WISHLIST_SUCCEEDED,
                payload
            }))
        ))
    )

    fetchDepositoryWishlist = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(WishlistActions.FETCH_DEPOSITORY_WISHLIST),
        mergeMap(action => this.wishlistService.fetchDepositoryWishlist().pipe(
            map(payload => ({
                type: WishlistActions.FETCH_DEPOSITORY_WISHLIST_SUCCEEDED,
                payload
            })),
            catchError(payload => of({
                type: WishlistActions.FETCH_DEPOSITORY_WISHLIST_FAILED,
                payload
            }))
        ))
    )
}
