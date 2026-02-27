import { ClientId } from './client.entity';

export type ClientModel = {
  id: ClientId;
  firstName: string;
  lastName: string;
  email: string | null;
  pictureUrl: string | null;
};

export type CreateClientModel = {
  firstName: string;
  lastName: string;
  email?: string | null;
  pictureUrl?: string | null;
};

export type UpdateClientModel = Partial<CreateClientModel>;

export type ClientListItemModel = ClientModel & {
  booksBoughtCount: number;
};

export type ClientSaleModel = {
  bookId: string;
  bookTitle: string;
  authorName: string;
  soldAt: string;
};

export type ClientDetailsModel = ClientModel & {
  sales: ClientSaleModel[];
};
