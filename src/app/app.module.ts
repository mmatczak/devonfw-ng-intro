import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookModule } from './book/book.module';
import { RouterModule } from '@angular/router';
import { BookOverviewComponent } from './book/book-overview/book-overview.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { SharedModule } from './shared/shared.module';
import { BookDetailsResolver } from './book/book-details/book-details.resolver';
import { HttpClientModule } from '@angular/common/http';
import { AuthorizedRoutes, Role } from './shared/security/security.model';
import { AuthorizationGuard } from './shared/security/authorization.guard';
import { AccessDeniedComponent } from './shared/security/access-denied.component';


export const routes: AuthorizedRoutes<Role> = [
  {path: '', pathMatch: 'full', redirectTo: '/books'},
  {
    path: 'books',
    component: BookOverviewComponent,
    permitAll: true,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'book',
    component: BookDetailsComponent,
    accessAllowedTo: Role.Admin,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'book/:bookId',
    component: BookDetailsComponent,
    accessAllowedTo: Role.User,
    resolve: {
      book: BookDetailsResolver
    },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
    permitAll: true,
    canActivate: [AuthorizationGuard]
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
}
