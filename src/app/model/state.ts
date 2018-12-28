export interface AppState {
    auth: AuthState;
}

export interface AuthState {
    isLoggedIn: boolean;
    stayLoggedIn: boolean;
    errorMessage?: string;
}

export const DEFAULT_APP_STATE: AppState = {
    auth: {
        isLoggedIn: false,
        stayLoggedIn: false
    }
};
