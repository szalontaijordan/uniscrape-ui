import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GoogleService } from './google.service';

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor(private http: HttpClient, private google: GoogleService) {
    }

    getSectionTitles(): Observable<Array<string>> {
        return this.http.get<{ sections: Array<string> }>('/api/book/depository/sections', { headers: this.google.headersObject }).pipe(
            map(response => response.sections)
        );
    }

    getSection(name: string): Observable<{ name: string, items: Array<any> }> {
        return this.http.get<{ books: Array<any> }>('/api/book/depository/section/' + name, { headers: this.google.headersObject }).pipe(
            map(response => ({ name, items: response.books }))
        );
    }

    search(searchTerm: string, activeTab: string, page: number = 1): Observable<{ activeTab: string, items: Array<any> }> {
        const URL = `/api/book/${activeTab}/search/${searchTerm}/${page}`;
        return this.http.get<{ books: Array<any> }>(URL, { headers: this.google.headersObject }).pipe(
            map(response => ({ activeTab, items: response.books })),
            catchError(err => of({ activeTab, items: [] }))
        );
    }

    getRecentSearches(): Observable<Array<string>> {
        return this.http.get<{ recentSearches: Array<string> }>('/api/book/all/searchHistory', { headers: this.google.headersObject }).pipe(
            map(response => response.recentSearches)
        );
    }

    depositoryLogin(credentials: { email: string, password: string}): Observable<any> {
        return this.http.post('/api/book/depository/auth/login', { ...credentials }, { headers: this.google.headersObject });
    }

    depositoryLogout(): Observable<any> {
        return this.http.post('/api/book/depository/auth/logout', {}, { headers: this.google.headersObject });
    }

    checkDepositoryAuth(): Observable<boolean> {
        return this.http.get<any & { message: string }>('/api/book/depository/auth', { headers: this.google.headersObject }).pipe(
            map(response => Boolean(response.message))
        );
    }

    checkWatcherSubscription(): Observable<boolean> {
        return this.http.get<any & { message: string }>('/api/internal/watcher/subscription', { headers: this.google.headersObject }).pipe(
            map(response => Boolean(response.message))
        );
    }

    subscribeToWatcher(email: string): Observable<boolean> {
        return this.http.post<any & { message: string }>('/api/internal/watcher/subscription', { email }, { headers: this.google.headersObject }).pipe(
            map(response => Boolean(response.message))
        );
    }

    unsubscribeFromWatcher(email: string): Observable<boolean> {
        return this.http.delete<any>('/api/internal/watcher/subscription/' + email, { headers: this.google.headersObject }).pipe(
            map(response => true)
        );
    }

}
