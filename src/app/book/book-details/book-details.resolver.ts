import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Book } from '../book.model';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { BookService } from '../book.service';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsResolver implements Resolve<Book> {
  constructor(private readonly bookService: BookService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const bookId = +route.params.bookId;
    return this.bookService.findOne(bookId);
  }
}
