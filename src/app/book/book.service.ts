import { Book } from './book.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookSubject = new BehaviorSubject([
    {
      id: 0,
      title: 'JavaScript. The good parts',
      author: 'Douglas Crockford'
    },
    {
      id: 1,
      title: 'Angular for nerds',
      author: 'Marek Matczak'
    }]);

  constructor() {
  }

  findAll(): Observable<Book[]> {
    return this.bookSubject;
  }

  update(book: Book): void {
    const currentBooks = this.bookSubject.getValue();
    const updatedBooks = currentBooks.map(
      currentBook => currentBook.id === book.id ? book : currentBook);
    this.bookSubject.next(updatedBooks);
  }
}
