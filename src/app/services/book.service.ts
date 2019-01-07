import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookService {

    private apiURL = 'http://localhost:8080/api/book';

    constructor(private http: HttpClient) {
    }

    getSectionTitles(): Observable<Array<string>> {
        return this.http.get<{ sections: Array<string> }>(`${this.apiURL}/depository/sections`, { headers: this.headersObject }).pipe(
            map(response => response.sections)
        );
    }

    getSection(name: string): Observable<{ name: string, items: Array<any> }> {
        return this.http.get<{ books: Array<any> }>(`${this.apiURL}/depository/section/${name}`, { headers: this.headersObject }).pipe(
            map(response => ({ name, items: response.books }))
        );
    }

    private get headersObject(): any {
        return {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('google')).idToken}`,
        }
    }
}
