import { AuthorId } from '../authors/author.entity';

export type BookAuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
};

export type BookListItemModel = {
  id: string;
  title: string;
  author: BookAuthorModel;
  yearPublished: number;
  pictureUrl: string | null;
  clientsBoughtCount: number;
};

export type BookClientSaleModel = {
  clientId: string;
  firstName: string;
  lastName: string;
  soldAt: string;
};

export type BookDetailsModel = {
  id: string;
  title: string;
  author: BookAuthorModel;
  yearPublished: number;
  pictureUrl: string | null;
  clients: BookClientSaleModel[];
};

export type CreateBookModel = {
  title: string;
  authorId: AuthorId;
  yearPublished: number;
  pictureUrl?: string | null;
};

export type UpdateBookModel = Partial<CreateBookModel>;

export type CreateSaleModel = {
  clientId: string;
  soldAt: string;
};

export type FilterBooksModel = {
  limit?: number;
  offset?: number;
  sortField?: 'title' | 'yearPublished';
  sortDirection?: 'ASC' | 'DESC';
};

export type GetBooksModel = {
  totalCount: number;
  data: BookListItemModel[];
};
