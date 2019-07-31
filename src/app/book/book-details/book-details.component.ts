import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent  {
  book: Book;

  constructor() {
    this.book = {
      title: 'JavaScript. The good parts',
      author: 'Douglas Crockford'
    };
  }
}
