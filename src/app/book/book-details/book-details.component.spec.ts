import { BookDetailsComponent } from './book-details.component';
import { async, TestBed } from '@angular/core/testing';

fdescribe('BookDetailsComponent', () => {
  describe('(class)', () => {
    it('creates a component and exposes a book', () => {
      // when
      const component = new BookDetailsComponent();
      // then
      expect(component.book).toBeDefined();
    });
  });

  describe('(DOM)', () => {
    let fixture;
    let element: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [BookDetailsComponent]
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

    it('renders title', () => {
      // when
      fixture.detectChanges();
      const titleElement = element.querySelector<HTMLDivElement>('div#title');
      // then
      expect(titleElement).toBeDefined();
      expect(titleElement.textContent).toBe('JavaScript. The good parts');
    });
  });
});
