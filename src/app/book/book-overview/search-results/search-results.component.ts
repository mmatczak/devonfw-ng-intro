import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../book.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  @Input()
  results: Book[];

  @Output()
  bookClick = new EventEmitter<Book>();


  notifyOnRowClick(book: Book) {
    this.bookClick.emit(book);
  }
}
