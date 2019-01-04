import { Injectable } from '@angular/core';
import { GoogleService } from 'src/app/services/google.service';
import { ActionsObservable, ofType, Epic } from 'redux-observable';
import { AuthActions } from '../actions/auth.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';

@Injectable()
export class AuthEpics {

    constructor(private googleService: GoogleService) {
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
}
