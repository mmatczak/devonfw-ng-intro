import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Observable, of, throwError } from 'rxjs';
import { fromPromise, tryCatch } from 'rxjs/internal-compatibility';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  book: Book | {};

  constructor(private readonly bookService: BookService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
    this.book = this.route.snapshot.data.book || {};
  }

  saveOrUpdateAndGoToOverview($event: Event) {
    $event.preventDefault();
    const formElement = $event.target as HTMLFormElement;
    const authorElement = formElement.querySelector<HTMLInputElement>('input#author');
    const titleElement = formElement.querySelector<HTMLInputElement>('input#title');
    const author = authorElement ? authorElement.value : '';
    const title = titleElement && titleElement.value || '';

    this.bookService.saveOrUpdate({...this.book, author, title})
      .subscribe(() => this.router.navigate(['/books']));
  }
}
