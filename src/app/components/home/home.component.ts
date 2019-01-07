import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { AuthState, HomeState } from 'src/app/model/state';
import { Observable, Subscription } from 'rxjs';
import { BookActions } from 'src/app/model/actions/book.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @select()
  auth: Observable<AuthState>;

  @select()
  home: Observable<HomeState>;

  subscription: Subscription;

  constructor(public bookActions: BookActions) {
  }

  ngOnInit() {
    this.bookActions.fetchSectionNames();

    this.subscription = this.home.subscribe({
      next: data => {
        if (data.sectionNames.length !== 0 && data.bookSections.length === 0) {
          data.sectionNames.forEach(name => this.bookActions.fetchSection(name));
        }
      }
    });
  }

  getBookItemsFor(name: string): Observable<Array<any>> {
    return this.home.pipe(
      map(home => home.bookSections.find(section => section.name === name).items)
    );
  }

  prev(name: string) {
    const carousel = document.querySelector(`[data-name="${name}"]`);
    carousel.scrollBy(-1000, 0);
  }

  next(name: string) {
    const carousel = document.querySelector(`[data-name="${name}"]`);
    carousel.scrollBy(1000, 0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
