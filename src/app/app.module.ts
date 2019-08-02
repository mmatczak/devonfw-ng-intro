import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookModule } from './book/book.module';
import { ResolveEnd, ResolveStart, Router, RouterModule } from '@angular/router';
import { BookOverviewComponent } from './book/book-overview/book-overview.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { SharedModule } from './shared/shared.module';
import { BookDetailsResolver } from './book/book-details/book-details.resolver';
import { HttpClientModule } from '@angular/common/http';


export const routes = [
  {path: '', pathMatch: 'full', redirectTo: '/books'},
  {
    path: 'books',
    component: BookOverviewComponent,

  },
  {
    path: 'book',
    component: BookDetailsComponent
  },
  {
    path: 'book/:bookId',
    component: BookDetailsComponent,
    resolve: {
      book: BookDetailsResolver
    }
  }];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BookModule,
    SharedModule,
    RouterModule.forRoot(routes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    router.events.subscribe(routerEvent => {
      if (routerEvent instanceof ResolveStart) {
        console.log('Start');
      } else if (routerEvent instanceof ResolveEnd) {
        console.log('End');
      }
    });
  }
}
