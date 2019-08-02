import { BookDetailsComponent } from './book-details.component';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { of } from 'rxjs';

describe('BookDetailsComponent', () => {
  describe('(DOM)', () => {
    let fixture;
    let element: HTMLElement;
    let testBook: Book;
    let bookServiceMock: any;
    let routerMock: any;

    beforeEach(async(() => {
      testBook = {
        id: 0,
        author: 'Test Author',
        title: 'Test Title'
      };

      bookServiceMock = jasmine.createSpyObj({saveOrUpdate: of({})});
      routerMock = jasmine.createSpyObj('router', ['navigate']);

      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          ReactiveFormsModule],
        declarations: [BookDetailsComponent],
        providers: [
          {
            provide: ActivatedRoute, useValue: {
              snapshot: {
                data: {
                  book: testBook
                }
              }
            }
          },
          {provide: BookService, useValue: bookServiceMock},
          {provide: Router, useValue: routerMock}]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BookDetailsComponent);
      element = fixture.nativeElement;
    });

    it('creates a component', () => {
      // then
      expect(fixture.componentInstance).toBeDefined();
    });

    it('renders author and title of an existing book', () => {
      // when
      fixture.detectChanges();
      const titleElement = element.querySelector<HTMLInputElement>('input#title');
      // then
      expect(titleElement).toBeDefined();
      expect(titleElement.value).toBe(testBook.title);
    });


    it('updates an existing book and goes to overview upon button click', () => {
      // given
      fixture.detectChanges();
      const titleElement = element.querySelector<HTMLInputElement>('input#title');
      titleElement.value = 'Updated Title';
      titleElement.dispatchEvent(new Event('input'));
      // when
      const buttonElement = element.querySelector<HTMLButtonElement>('button');
      buttonElement.click();
      // then
      expect(bookServiceMock.saveOrUpdate).toHaveBeenCalledWith({
        id: testBook.id, author: testBook.author, title: 'Updated Title'
      });
      expect(routerMock.navigate).toHaveBeenCalledWith(['/books']);
    });
  });
});
