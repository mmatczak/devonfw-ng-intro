import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  @Input()
  book: Book;

  @Output()
  bookChange = new EventEmitter<Book>();

  notifyOnBookUpdate($event: Event) {
    $event.preventDefault();
    const formElement = $event.target as HTMLFormElement;
    const authorElement = formElement.querySelector<HTMLInputElement>('input#author');
    const titleElement = formElement.querySelector<HTMLInputElement>('input#title');
    const author = authorElement ? authorElement.value : '';
    const title = titleElement && titleElement.value || '';

    this.bookChange.emit({
      ...this.book,
      author, title
    });
  }
}
