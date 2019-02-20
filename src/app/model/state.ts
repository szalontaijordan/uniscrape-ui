import { GoogleProfile } from './types/google-profile.type';

export interface AppState {
    auth: AuthState;
    home: HomeState;
    search: SearchState;
    wishlist: WishlistState;
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

export interface SearchState {
    searchTerm: string;
    recent: Array<string>;
    activeTab: string;
    isLoading: boolean;
    results: {
        depository: Array<any>;
        ebay: Array<any>;
        amazon: Array<any>;
    };
    isNextPageLoading?: boolean;
    searchSites: Array<{ name: string, title: string }>;
    errorMessage?: string;
}

export interface WishlistState {
    isLoading: boolean;
    items: Array<any>;
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
    },
    search: {
        searchTerm: '',
        recent: [],
        activeTab: 'depository',
        isLoading: false,
        isNextPageLoading: false,
        results: {
            depository: [],
            ebay: [],
            amazon: []
        },
        searchSites: [
            { name: 'depository', title: 'The Bookdepository' },
            { name: 'ebay', title: 'Ebay' },
            { name: 'amazon', title: 'Amazon' }
        ]
    },
    wishlist: {
        isLoading: true,
        items: null
    }
};
