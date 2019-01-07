import { DEFAULT_APP_STATE, AuthState } from '../state';
import { AuthActions } from '../actions/auth.actions';
import { Reducer, AnyAction } from 'redux';

export const authReducer: Reducer<AuthState> = (state: AuthState = DEFAULT_APP_STATE.auth, action: AnyAction): AuthState => {
    switch (action.type) {
        case AuthActions.AUTH_LOGIN_STARTED:
            return {
                ...state,
                isLoading: true,
                stayLoggedIn: action.payload
            };
        case AuthActions.AUTH_LOGIN_REFRESH:
            return {
                ...state,
                isLoading: true,
                errorMessage: `refresh_${action.payload.user.name.split(' ')[0]}`
            }
        case AuthActions.AUTH_LOGIN_SUCCEEDED:
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false,
                userIdToken: action.payload.idToken,
                currentUser: action.payload.user,
                errorMessage: ''
            };
        case AuthActions.AUTH_LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload.error
            };
        case AuthActions.AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userIdToken: '',
                currentUser: null
            };
        default:
            return {
                ...state
            };
    }
};
