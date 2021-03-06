import { Injectable } from '@angular/core';
import { GoogleService } from 'src/app/services/google.service';
import { ActionsObservable, ofType, Epic } from 'redux-observable';
import { AuthActions } from '../actions/auth.actions';
import { map, mergeMap, catchError, debounce, debounceTime } from 'rxjs/operators';
import { of, from, merge, timer } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { WishlistActions } from '../actions/wishlist.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthEpics {

    constructor(private googleService: GoogleService, private bookService: BookService, private wishlist: WishlistActions) {
    }

    login = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(AuthActions.AUTH_LOGIN_STARTED),
        mergeMap(action => from(this.googleService.login()).pipe(
            map(payload => ({
                type: AuthActions.AUTH_LOGIN_SUCCEEDED,
                payload
            })),
            catchError(payload => of({
                type: AuthActions.AUTH_LOGIN_FAILED,
                payload
            }))
        ))
    )

    logout = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(AuthActions.AUTH_LOGOUT),
        mergeMap(action => from(this.googleService.logout()).pipe(
            map(payload => ({
                type: AuthActions.AUTH_LOGOUT_SUCCEEDED,
                payload
            }))
        ))
    )

    refresh = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(AuthActions.AUTH_LOGIN_REFRESH),
        mergeMap(action => from(this.googleService.refresh()).pipe(
            map(payload => ({
                type: AuthActions.AUTH_LOGIN_REFRESH_SUCCEEDED,
            })),
            catchError(payload => of({
                type: AuthActions.AUTH_LOGIN_REFRESH_FAILED,
                payload
            }))
        ))
    )

    depositoryLogin = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(AuthActions.DEPOSITORY_LOGIN),
        mergeMap(action => from(this.bookService.depositoryLogin(action.payload)).pipe(
            map(payload => {
                this.wishlist.hideDepositoryLogin();
                this.wishlist.fetchDepositoryWishlist();
                return {
                    type: AuthActions.DEPOSITORY_LOGIN_SUCCEDED,
                    payload
                };
            }),
            catchError(payload => of({
                type: AuthActions.DEPOSITORY_LOGIN_FAILED,
                payload
            }))
        ))
    )

    depositoryLogout = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(AuthActions.DEPOSITOR_LOGOUT),
        mergeMap(action => from(this.bookService.depositoryLogout()).pipe(
            map(payload => {
                this.wishlist.showDepositoryLogin();
                return {
                    type: AuthActions.DEPOSITOR_LOGOUT_SUCCEEDED,
                    payload
                };
            }),
            catchError(payload => of({
                type: AuthActions.DEPOSITORY_LOGIN_FAILED,
                payload
            }))
        ))
    )

    depositoryCheckAuth = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(AuthActions.DEPOSITORY_CHECK_AUTH),
        mergeMap(action => from(this.bookService.checkDepositoryAuth()).pipe(
            map(payload => {
                this.wishlist.hideDepositoryLogin();
                this.wishlist.fetchDepositoryWishlist();
                return {
                    type: AuthActions.DEPOSITORY_LOGIN_SUCCEDED,
                    payload
                };
            }),
            catchError(payload => of({
                type: AuthActions.DEPOSITORY_LOGIN_FAILED,
                payload
            }))
        ))
    )

    watcherCheckSubscription = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(AuthActions.WATCHER_SUBSCRIPTION_CHECK),
        mergeMap(action => from(this.bookService.checkWatcherSubscription()).pipe(
            map(payload => ({
                type: AuthActions.WATCHER_SUBSCRIPTION_CHECK_SUCCEEDED,
                payload: true
            })),
            catchError(payload => of({
                type: AuthActions.WATCHER_SUBSCRIPTION_CHECK_SUCCEEDED,
                payload: false
            }))
        ))
    )

    watcherSubscribe = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(AuthActions.WATCHER_SUBSCRIPTION_SUBSCRIBE),
        debounce(() => timer(300)),
        mergeMap(action => from(this.bookService.subscribeToWatcher(action.payload)).pipe(
            map(payload => ({
                type: AuthActions.WATCHER_SUBSCRIPTION_SUBSCRIBE_SUCCEEDED,
            })),
            catchError(payload => of({
                type: AuthActions.WATCHER_SUBSCRIPTION_CHECK_SUCCEEDED,
                payload: false
            }))
        ))
    )

    watcherUnsubscribe = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(AuthActions.WATCHER_SUBSCRIPTION_UNSUBSCRIBE),
        debounce(() => timer(300)),
        mergeMap(action => from(this.bookService.unsubscribeFromWatcher(action.payload)).pipe(
            map(payload => ({
                type: AuthActions.WATCHER_SUBSCRIPTION_UNSUBSCRIBE_SUCCEEDED,
            })),
            catchError(payload => of({
                type: AuthActions.WATCHER_SUBSCRIPTION_CHECK_SUCCEEDED,
                payload: false
            }))
        ))
    )
}
