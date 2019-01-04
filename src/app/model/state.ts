import { GoogleProfile } from "./types/google-profile.type";

export interface AppState {
    auth: AuthState;
}

export interface AuthState {
    isLoggedIn: boolean;
    isLoading: boolean;
    stayLoggedIn: boolean;
    errorMessage?: string;
    currentUser?: GoogleProfile;
    userIdToken?: string;
}

export const DEFAULT_APP_STATE: AppState = {
    auth: {
        isLoggedIn: false,
        isLoading: false,
        stayLoggedIn: false
    }
};
