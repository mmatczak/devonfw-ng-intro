import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit {
  books: Book[];

  selectedBook: Book | undefined;

  constructor() {
    this.books = [];
  }

  ngOnInit() {
    setTimeout(() => {
      this.books.push({
        title: 'JavaScript. The good parts',
        author: 'Douglas Crockford'
      });

      this.books.push({
        title: 'Angular for nerds',
        author: 'Marek Matczak'
      });
    }, 2000);
  }

  selectBook(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return this.selectedBook === book;
  }
}
