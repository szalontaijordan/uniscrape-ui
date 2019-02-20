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
        switch (activeTab) {
            case 'depository':
                return this.depositorySearch(searchTerm, page);
            case 'ebay':
                return this.ebaySearch(searchTerm, page);
            case 'amazon':
                return this.amazonSearch(searchTerm, page);
            default:
                return of({ activeTab, items: [] });
        }
    }

    getRecentSearches(): Observable<Array<string>> {
        return this.http.get<{ recentSearches: Array<string> }>('/api/book/all/searchHistory', { headers: this.google.headersObject }).pipe(
            map(response => response.recentSearches)
        );
    }

    depositoryLogin(credentials: { email: string, password: string}): Observable<any> {
        return this.http.post('/api/book/depository/auth/login', { ...credentials }, { headers: this.google.headersObject });
    }

    private depositorySearch(searchTerm: string, page: number): Observable<{ activeTab: string, items: Array<any> }> {
        const URL = '/api/book/depository/search/' + searchTerm + '/' + page;
        return this.http.get<{ books: Array<any> }>(URL, { headers: this.google.headersObject }).pipe(
            map(response => ({ activeTab: 'depository', items: response.books })),
            catchError(err => of({ activeTab: 'depository', items: [] }))
        );
    }

    private ebaySearch(searchTerm: string, page: number): Observable<{ activeTab: string, items: Array<any> }> {
        const URL = '/api/book/ebay/search/' + searchTerm + '/' + page;
        return this.http.get<{ books: Array<any> }>(URL, { headers: this.google.headersObject }).pipe(
            map(response => ({ activeTab: 'ebay', items: response.books })),
            catchError(err => of({ activeTab: 'ebay', items: [] }))
        );
    }

    private amazonSearch(searchTerm: string, page: number): Observable<{ activeTab: string, items: Array<any> }> {
        const URL = '/api/book/amazon/search/' + searchTerm + '/' + page;
        return this.http.get<{ books: Array<any> }>(URL, { headers: this.google.headersObject }).pipe(
            map(response => ({ activeTab: 'amazon', items: response.books })),
            catchError(err => of({ activeTab: 'amazon', items: [] }))
        );
    }
}
