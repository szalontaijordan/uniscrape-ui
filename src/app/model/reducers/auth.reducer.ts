import { DEFAULT_APP_STATE, AuthState } from '../state';
import { AuthActions } from '../actions/auth.actions';
import { Reducer, AnyAction } from 'redux';

export const authReducer: Reducer<AuthState> = (state: AuthState = DEFAULT_APP_STATE.auth, action: AnyAction): AuthState => {
    switch (action.type) {
        case AuthActions.AUTH_LOGIN_STARTED:
            return {
                ...state,
                stayLoggedIn: action.payload
            };
        case AuthActions.AUTH_LOGIN_SUCCEEDED:
            return {
                ...state,
                isLoggedIn: true,
                errorMessage: ''
            };
        case AuthActions.AUTH_LOGIN_FAILED:
            return {
                ...state,
                errorMessage: action.payload.error.code
            };
        case AuthActions.AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            };
        default:
            return {
                ...state
            };
    }
};
