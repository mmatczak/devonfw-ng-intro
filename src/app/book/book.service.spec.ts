import { BookService } from './book.service';

describe('BookService', () => {
  it('returns two books initially', () => {
    // given
    const service = new BookService();
    // when
    service.findAll().subscribe(books => {
      // then
      expect(books).toBeDefined();
      expect(books.length).toBe(2);
    });
  });

  it('finds a book', () => {

  });

  it('saves a new book', () => {

  });

  it('updates an existing book', () => {

  });
});
