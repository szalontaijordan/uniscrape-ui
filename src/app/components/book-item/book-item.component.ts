import { Component, OnInit, Input } from '@angular/core';
import { WishlistActions } from 'src/app/model/actions/wishlist.actions';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {

  @Input()
  item: any;

  constructor(private wishlistActions: WishlistActions) {
  }

  ngOnInit() {
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
