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
        case AuthActions.DEPOSITORY_LOGIN:
        case AuthActions.DEPOSITORY_CHECK_AUTH:
            return {
                ...state,
                isBookDepositoryLoginLoading: true
            };
        case AuthActions.DEPOSITORY_LOGIN_SUCCEDED:
        case AuthActions.DEPOSITORY_LOGIN_FAILED:
            return {
                ...state,
                isBookDepositoryLoginLoading: false
            };
        case AuthActions.WATCHER_SUBSCRIPTION_CHECK_SUCCEEDED:
            return {
                ...state,
                isSubscribedToWatcher: action.payload
            };
        case AuthActions.WATCHER_SUBSCRIPTION_SUBSCRIBE_SUCCEEDED:
            return {
                ...state,
                isSubscribedToWatcher: true
            };
        case AuthActions.WATCHER_SUBSCRIPTION_UNSUBSCRIBE_SUCCEEDED:
            return {
                ...state,
                isSubscribedToWatcher: false
            };
        default:
            return {
                ...state
            };
    }
};
