export interface Book {
  id: number;
  author: string;
  title: string;
}

export type BookProperties = Pick<Book, Exclude<keyof Book, 'id'>>;

export interface SearchCriteria {
  author?: string;
  title?: string;
}
