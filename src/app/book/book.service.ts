import { Book, BookProperties } from './book.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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

  constructor(private readonly http: HttpClient) {
  }

  findAll(): Observable<Book[]> {
    return this.http.get<Book[]>('api/books');
  }

  saveOrUpdate(book: Book | BookProperties): Observable<Book> {
    const id = (book as Book).id;
    if (id != null) {
      return this.http.put<Book>(`api/books/${id}`, book);
    } else {
      return this.http.post<Book>(`api/books`, book);
    }
  }

  findOne(id: number): Observable<Book> {
    return this.http.get<Book>(`api/books/${id}`);
  }
}
