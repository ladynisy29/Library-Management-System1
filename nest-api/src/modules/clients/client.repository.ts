import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BookEntity } from '../books/entities/book.entity';
import { SaleEntity } from '../sales/sale.entity';
import { AuthorEntity } from '../authors/author.entity';
import { ClientEntity, ClientId } from './client.entity';
import {
  ClientSaleModel,
  ClientDetailsModel,
  ClientListItemModel,
  ClientModel,
  CreateClientModel,
  UpdateClientModel,
} from './client.model';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  public async getAllClients(): Promise<ClientListItemModel[]> {
    const clients: ClientEntity[] = await this.clientRepository.find({
      order: { lastName: 'ASC', firstName: 'ASC' },
    });

    const clientIds: string[] = clients.map(
      (client: ClientEntity): string => client.id,
    );
    const sales: SaleEntity[] =
      clientIds.length === 0
        ? []
        : await this.saleRepository.find({
            where: { clientId: In(clientIds) },
          });

    const booksBoughtCountByClientId: Record<string, number> = {};
    sales.forEach((sale: SaleEntity): void => {
      booksBoughtCountByClientId[sale.clientId] =
        (booksBoughtCountByClientId[sale.clientId] ?? 0) + 1;
    });

    return clients.map(
      (client: ClientEntity): ClientListItemModel => ({
        ...client,
        booksBoughtCount: booksBoughtCountByClientId[client.id] ?? 0,
      }),
    );
  }

  public async getClientById(id: string): Promise<ClientDetailsModel | null> {
    const client: ClientEntity | null = await this.clientRepository.findOne({
      where: { id: id as ClientId },
    });

    if (!client) {
      return null;
    }

    const sales: SaleEntity[] = await this.saleRepository.find({
      where: { clientId: client.id },
      order: { soldAt: 'DESC' },
    });

    const bookIds: string[] = sales.map(
      (sale: SaleEntity): string => sale.bookId,
    );
    const books: BookEntity[] =
      bookIds.length === 0
        ? []
        : await this.bookRepository.find({
            where: { id: In(bookIds) },
          });

    const authorIds: string[] = books.map(
      (book: BookEntity): string => book.authorId,
    );
    const authors: AuthorEntity[] =
      authorIds.length === 0
        ? []
        : await this.authorRepository.find({ where: { id: In(authorIds) } });

    const bookById: Record<string, BookEntity> = {};
    books.forEach((book: BookEntity): void => {
      bookById[book.id] = book;
    });

    const authorById: Record<string, AuthorEntity> = {};
    authors.forEach((author: AuthorEntity): void => {
      authorById[author.id] = author;
    });

    return {
      ...client,
      sales: sales
        .map((sale: SaleEntity): ClientSaleModel | null => {
          const book: BookEntity | undefined = bookById[sale.bookId];
          if (!book) {
            return null;
          }

          const author: AuthorEntity | undefined = authorById[book.authorId];
          const authorName: string = author
            ? `${author.firstName} ${author.lastName}`
            : 'Unknown author';

          return {
            bookId: book.id as string,
            bookTitle: book.title,
            authorName,
            soldAt: sale.soldAt,
          };
        })
        .filter(
          (item: ClientSaleModel | null): item is ClientSaleModel =>
            item !== null,
        ),
    };
  }

  public async createClient(input: CreateClientModel): Promise<ClientModel> {
    return this.clientRepository.save(
      this.clientRepository.create({
        ...input,
        email: input.email ?? null,
        pictureUrl: input.pictureUrl ?? null,
      }),
    );
  }

  public async updateClient(
    id: string,
    input: UpdateClientModel,
  ): Promise<ClientModel | null> {
    const client: ClientEntity | null = await this.clientRepository.findOne({
      where: { id: id as ClientId },
    });

    if (!client) {
      return null;
    }

    await this.clientRepository.update(id, {
      firstName: input.firstName ?? client.firstName,
      lastName: input.lastName ?? client.lastName,
      email: input.email ?? client.email,
      pictureUrl: input.pictureUrl ?? client.pictureUrl,
    });

    const updatedClient: ClientEntity | null =
      await this.clientRepository.findOne({
        where: { id: id as ClientId },
      });

    return updatedClient;
  }

  public async deleteClient(id: string): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
