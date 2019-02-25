import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleService } from './google.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient, private google: GoogleService) {
  }

  public fetchWishlist(): Observable<any> {
    return this.http.get<any & { books: Array<any> }>('/api/internal/wishlist', { headers: this.google.headersObject }).pipe(
      map(wishlist => wishlist.books)
    );
  }

  public addItemToWishlist(bookItem: any): Observable<any> {
    return this.http.post('/api/internal/wishlist', { bookItem }, { headers: this.google.headersObject });
  }

  public removeItemFromWishlist(bookItem: any): Observable<any> {
    return this.http.delete('/api/internal/wishlist/' + bookItem.ISBN, { headers: this.google.headersObject });
  }

  public fetchDepositoryWishlist(): Observable<any> {
    return this.http.get<any & { books: Array<any> }>('/api/book/depository/wishlist', { headers: this.google.headersObject }).pipe(
      map(wishlist => wishlist.books)
    );
  }
}
