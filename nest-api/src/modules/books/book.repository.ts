import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AuthorEntity } from '../authors/author.entity';
import {
  BookDetailsModel,
  BookListItemModel,
  CreateSaleModel,
  CreateBookModel,
  FilterBooksModel,
  UpdateBookModel,
} from './book.model';
import { BookEntity, BookId } from './entities/book.entity';
import { ClientEntity } from '../clients/client.entity';
import { SaleEntity } from '../sales/sale.entity';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  public async getAllBooks(
    input?: FilterBooksModel,
  ): Promise<[BookListItemModel[], number]> {
    const [books, totalCount] = await this.bookRepository.findAndCount({
      take: input?.limit,
      skip: input?.offset,
      relations: { author: true },
      order: {
        [input?.sortField ?? 'title']: input?.sortDirection ?? 'ASC',
      },
    });

    const bookIds: string[] = books.map((book: BookEntity): string => book.id);

    const sales: SaleEntity[] =
      bookIds.length === 0
        ? []
        : await this.saleRepository.find({
            where: { bookId: In(bookIds) },
          });

    const clientsCountByBookId: Record<string, number> = {};
    sales.forEach((sale: SaleEntity): void => {
      clientsCountByBookId[sale.bookId] =
        (clientsCountByBookId[sale.bookId] ?? 0) + 1;
    });

    return [
      books.map(
        (book: BookEntity): BookListItemModel => ({
          id: book.id,
          title: book.title,
          yearPublished: book.yearPublished,
          pictureUrl: book.pictureUrl,
          author: {
            id: book.author.id,
            firstName: book.author.firstName,
            lastName: book.author.lastName,
          },
          clientsBoughtCount: clientsCountByBookId[book.id] ?? 0,
        }),
      ),
      totalCount,
    ];
  }

  public async getBookById(id: string): Promise<BookDetailsModel | null> {
    const book = await this.bookRepository.findOne({
      where: { id: id as BookId },
      relations: { author: true },
    });

    if (!book) {
      return null;
    }

    const sales: SaleEntity[] = await this.saleRepository.find({
      where: { bookId: book.id },
      order: { soldAt: 'DESC' },
    });
    const clientIds: string[] = sales.map(
      (sale: SaleEntity): string => sale.clientId,
    );

    const clients: ClientEntity[] =
      clientIds.length === 0
        ? []
        : await this.clientRepository.find({
            where: { id: In(clientIds) },
          });

    const clientMap: Record<string, ClientEntity> = {};
    clients.forEach((client: ClientEntity): void => {
      clientMap[client.id] = client;
    });

    return {
      id: book.id,
      title: book.title,
      yearPublished: book.yearPublished,
      pictureUrl: book.pictureUrl,
      author: {
        id: book.author.id,
        firstName: book.author.firstName,
        lastName: book.author.lastName,
      },
      clients: sales
        .map((sale: SaleEntity) => {
          const client: ClientEntity | undefined = clientMap[sale.clientId];
          if (!client) {
            return null;
          }

          return {
            clientId: client.id,
            firstName: client.firstName,
            lastName: client.lastName,
            soldAt: sale.soldAt,
          };
        })
        .filter((sale) => sale !== null),
    };
  }

  public async createBook(book: CreateBookModel): Promise<BookDetailsModel> {
    const author = await this.authorRepository.findOne({
      where: { id: book.authorId },
    });

    if (!author) {
      throw new Error('Author not found');
    }

    const createdBook: BookEntity = await this.bookRepository.save(
      this.bookRepository.create({
        ...book,
        pictureUrl: book.pictureUrl ?? null,
      }),
    );

    const createdBookDetails: BookDetailsModel | null = await this.getBookById(
      createdBook.id,
    );

    if (!createdBookDetails) {
      throw new Error('Book not found after creation');
    }

    return createdBookDetails;
  }

  public async updateBook(
    id: string,
    book: UpdateBookModel,
  ): Promise<BookDetailsModel | null> {
    const oldBook = await this.bookRepository.findOne({
      where: { id: id as BookId },
    });

    if (!oldBook) {
      return null;
    }

    if (book.authorId) {
      const author: AuthorEntity | null = await this.authorRepository.findOne({
        where: { id: book.authorId },
      });

      if (!author) {
        throw new Error('Author not found');
      }
    }

    await this.bookRepository.update(id, book);

    return this.getBookById(id);
  }

  public async deleteBook(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }

  public async createSale(
    bookId: string,
    input: CreateSaleModel,
  ): Promise<BookDetailsModel | null> {
    const book: BookEntity | null = await this.bookRepository.findOne({
      where: { id: bookId as BookId },
    });

    if (!book) {
      return null;
    }

    const client: ClientEntity | null = await this.clientRepository.findOne({
      where: { id: input.clientId as ClientEntity['id'] },
    });

    if (!client) {
      throw new Error('Client not found');
    }

    await this.saleRepository.save(
      this.saleRepository.create({
        bookId,
        clientId: input.clientId,
        soldAt: input.soldAt,
      }),
    );

    return this.getBookById(bookId);
  }
}
