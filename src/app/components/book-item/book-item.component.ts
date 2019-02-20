import { Component, OnInit, Input } from '@angular/core';
import { WishlistActions } from 'src/app/model/actions/wishlist.actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { WishlistState } from 'src/app/model/state';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {

  @Input()
  item: any;

  @select()
  wishlist: Observable<WishlistState>;

  constructor(private wishlistActions: WishlistActions) {
  }

  ngOnInit() {
    this.wishlist.subscribe({
      next: wishlist => {
        if (wishlist.items) {
          this.item['isOnWishlist'] = wishlist.items.some(item => this.item.ISBN === item.ISBN);
        }
      }
    });
  }

  toggleWishlist(): void {
    if (!this.item.isOnWishlist) {
      this.wishlistActions.addItemToWishlist(this.item);
    } else {
      this.wishlistActions.removeItemFromWishlist(this.item);
    }
  }

  get itemURL(): string {
    return this.createDepositoryURL(this.item.url);
  }

  get authorURL(): string {
    return this.createDepositoryURL(this.item.author.url);
  }

  private createDepositoryURL(url: string): string {
    if (!url.startsWith('http')) {
      return 'https://www.bookdepository.com' + url;
    }

    return url;
  }
}
