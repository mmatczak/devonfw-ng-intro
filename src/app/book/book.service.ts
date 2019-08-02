import { Book, BookProperties, SearchCriteria } from './book.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  search(searchCriteria: SearchCriteria): Observable<Book[]> {
    let params = new HttpParams();
    if (searchCriteria.author) {
      params = params.append('author', searchCriteria.author);
    }
    if (searchCriteria.title) {
      params = params.append('title', searchCriteria.title);
    }

    return this.http.get<Book[]>('api/books', {params});
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
