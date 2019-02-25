import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { DEFAULT_APP_STATE, AppState } from './model/state';
import { AuthEpics } from './model/epics/auth.epic';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import { authReducer } from './model/reducers/auth.reducer';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookEpics } from './model/epics/book.epic';
import { bookReducer } from './model/reducers/book.reducer';
import { SearchComponent } from './components/search/search.component';
import { SearchFormComponent } from './components/search/search-form/search-form.component';
import { searchReducer } from './model/reducers/search.reducer';
import { SearchEpics } from './model/epics/search.epic';
import { SearchResultsTabComponent } from './components/search/search-results-tab/search-results-tab.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { wishlistReducer } from './model/reducers/wishlist.reducer';
import { WishlistEpics } from './model/epics/wishlist.epic';
import { DepositoryWishlistComponent } from './components/wishlist/depository-wishlist/depository-wishlist.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SearchComponent,
    SearchFormComponent,
    SearchResultsTabComponent,
    BookItemComponent,
    WishlistComponent,
    DepositoryWishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    HttpClientModule,
    FormsModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private ngRedux: NgRedux<AppState>,
              private authEpics: AuthEpics,
              private bookEpics: BookEpics,
              private searchEpics: SearchEpics,
              private wishlistEpics: WishlistEpics) {
    const epicMiddleware = createEpicMiddleware();

    const reducers = {
      auth: authReducer,
      home: bookReducer,
      search: searchReducer,
      wishlist: wishlistReducer
    };

    this.ngRedux.configureStore(combineReducers(reducers), DEFAULT_APP_STATE, [
      createLogger(),
      epicMiddleware
    ]);

    epicMiddleware.run(combineEpics(
      this.authEpics.login,
      this.authEpics.logout,
      this.authEpics.refresh,
      this.authEpics.depositoryLogin,
      this.authEpics.depositoryLogout,
      this.authEpics.depositoryCheckAuth,
      this.bookEpics.fetchSectionNames,
      this.bookEpics.fetchSection,
      this.searchEpics.search,
      this.searchEpics.recent,
      this.searchEpics.loadTabIfEmpty,
      this.searchEpics.loadNextPage,
      this.wishlistEpics.fetchWishlist,
      this.wishlistEpics.addItemToWishlist,
      this.wishlistEpics.removeItemFromWishlist,
      this.wishlistEpics.fetchDepositoryWishlist
    ));
  }

}
