import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  isTokenValid(idToken: string): Observable<boolean> {
    const headers = {
      'Authorization': `Bearer ${idToken}`
    };

    return this.http.get<{ message: string }>('/api/book/all/auth', { headers }).pipe(
      map(response => response.message === 'true'),
      catchError(err => of(false))
    );
  }
}
