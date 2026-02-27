import { AuthorId } from './author.entity';

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  pictureUrl: string | null;
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
  pictureUrl?: string | null;
};

export type UpdateAuthorModel = Partial<CreateAuthorModel>;

export type AuthorListItemModel = AuthorModel & {
  booksCount: number;
};

export type AuthorBookModel = {
  id: string;
  title: string;
  yearPublished: number;
  pictureUrl: string | null;
};

export type AuthorDetailsModel = AuthorModel & {
  books: AuthorBookModel[];
  averageSales: number;
};
