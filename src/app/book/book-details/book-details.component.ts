import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Observable, of, throwError } from 'rxjs';
import { fromPromise, tryCatch } from 'rxjs/internal-compatibility';
import { catchError } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  book: Book | {};

  bookForm: FormGroup;

  constructor(private readonly bookService: BookService,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              formBuilder: FormBuilder) {
    this.book = this.route.snapshot.data.book || {};

    this.bookForm = formBuilder.group({
        author: formBuilder.control('', [Validators.required, Validators.maxLength(15)]),
        title: formBuilder.control('', [Validators.required])
    });

    this.bookForm.patchValue(this.book);
  }

  getErrorsForControl(controlName: string) {
    const errorMessages: string[] = [];
    const errors = this.bookForm.get(controlName).errors;
    if (errors) {
      Object.keys(errors).forEach(errorCode => {
        if (errorCode === 'required') {
          errorMessages.push('Please provide a value');
        } else {
          errorMessages.push('Unknown error...');
        }
      });
    }
    return errorMessages;
  }

  saveOrUpdateAndGoToOverview() {
    if (this.bookForm.valid) {
      const author = this.bookForm.get('author').value;
      const title = this.bookForm.get('title').value;

      this.bookService.saveOrUpdate({...this.book, author, title})
        .subscribe(() => this.router.navigate(['/books']));
    }
  }
}
