import { GoogleProfile } from './types/google-profile.type';

export interface AppState {
    auth: AuthState;
    home: HomeState;
}

export interface AuthState {
    isLoggedIn: boolean;
    isLoading: boolean;
    stayLoggedIn: boolean;
    errorMessage?: string;
    currentUser?: GoogleProfile;
    userIdToken?: string;
}

export interface HomeState {
    isLoading: boolean;
    sectionNames?: Array<string>;
    bookSections?: Array<{ name: string, items: Array<any> }>;
    errorMessage?: string;
}

export const DEFAULT_APP_STATE: AppState = {
    auth: {
        isLoggedIn: false,
        isLoading: false,
        stayLoggedIn: false
    },
    home: {
        isLoading: false,
        bookSections: [],
        sectionNames: []
    }
};
