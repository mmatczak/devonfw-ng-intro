import { Component } from '@angular/core';
import { Book, SearchCriteria } from '../book.model';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent {
  searchCriteria: SearchCriteria = {};
  books$: Observable<Book[]>;

  constructor(private readonly bookService: BookService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
    this.books$ = route.params
      .pipe(
        tap(params => this.searchCriteria = params),
        switchMap(params => this.bookService.search(params))
      );
  }

  goToBookDetails(book: Book) {
    this.router.navigate(['/book', book.id]);
  }

  refreshParams(searchCriteria: SearchCriteria) {
    this.router.navigate([searchCriteria], {relativeTo: this.route});
  }
}
