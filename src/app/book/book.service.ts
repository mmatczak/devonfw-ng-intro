import { Book, BookProperties } from './book.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private idSeq = 0;

  private bookSubject = new BehaviorSubject([
    {
      id: this.idSeq++,
      title: 'JavaScript. The good parts',
      author: 'Douglas Crockford'
    },
    {
      id: this.idSeq++,
      title: 'Angular for nerds',
      author: 'Marek Matczak'
    }]);

  constructor() {
  }

  findAll(): Observable<Book[]> {
    return this.bookSubject;
  }

  saveOrUpdate(book: Book | BookProperties): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const currentBooks = this.bookSubject.getValue();
      let updatedBooks;
      let bookAfterUpdate;

      const id = (book as Book).id;
      if (id != null) {
        updatedBooks = currentBooks.map(
          currentBook => currentBook.id === id ? book : currentBook);
        bookAfterUpdate = book;
      } else {
        bookAfterUpdate = {...book, id: this.idSeq++};
        updatedBooks = [...currentBooks, bookAfterUpdate];
      }
      this.bookSubject.next(updatedBooks);

      subscriber.next(bookAfterUpdate);
      subscriber.complete();
    });
  }

  findOne(id: number): Observable<Book> {
    const currentBooks = this.bookSubject.getValue();
    const foundBook = currentBooks.find(book => book.id === id);

    return foundBook ? of(foundBook).pipe(delay(2000)) : throwError(`No book with id: ${id} found`);
  }
}
