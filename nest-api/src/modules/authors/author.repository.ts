import { Injectable } from '@nestjs/common';
import {
  AuthorDetailsModel,
  AuthorListItemModel,
  AuthorModel,
  CreateAuthorModel,
  UpdateAuthorModel,
} from './author.model';
import { AuthorEntity, AuthorId } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from '../books/entities/book.entity';
import { SaleEntity } from '../sales/sale.entity';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  public async getAllAuthors(): Promise<AuthorListItemModel[]> {
    const authors: AuthorEntity[] = await this.authorRepository.find();

    const booksCountByAuthorId: Record<string, number> = {};

    await Promise.all(
      authors.map(async (author: AuthorEntity): Promise<void> => {
        booksCountByAuthorId[author.id] = await this.bookRepository.count({
          where: { authorId: author.id },
        });
      }),
    );

    return authors.map(
      (author: AuthorEntity): AuthorListItemModel => ({
        ...author,
        booksCount: booksCountByAuthorId[author.id] ?? 0,
      }),
    );
  }

  public async getAuthorById(id: string): Promise<AuthorDetailsModel | null> {
    const author: AuthorEntity | null = await this.authorRepository.findOne({
      where: { id: id as AuthorId },
    });

    if (!author) {
      return null;
    }

    const books: BookEntity[] = await this.bookRepository.find({
      where: { authorId: author.id },
      order: { title: 'ASC' },
    });

    const salesCountByBookId: Record<string, number> = {};

    await Promise.all(
      books.map(async (book: BookEntity): Promise<void> => {
        salesCountByBookId[book.id] = await this.saleRepository.count({
          where: { bookId: book.id },
        });
      }),
    );

    const totalSales: number = books.reduce(
      (previous: number, current: BookEntity): number =>
        previous + (salesCountByBookId[current.id] ?? 0),
      0,
    );
    const averageSales: number =
      books.length === 0 ? 0 : totalSales / books.length;

    return {
      ...author,
      books: books.map((book: BookEntity) => ({
        id: book.id,
        title: book.title,
        yearPublished: book.yearPublished,
        pictureUrl: book.pictureUrl,
      })),
      averageSales,
    };
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(
      this.authorRepository.create({
        ...author,
        pictureUrl: author.pictureUrl ?? null,
      }),
    );
  }

  public async updateAuthor(
    id: string,
    author: UpdateAuthorModel,
  ): Promise<AuthorModel | null> {
    const existingAuthor: AuthorEntity | null =
      await this.authorRepository.findOne({
        where: { id: id as AuthorId },
      });

    if (!existingAuthor) {
      return null;
    }

    await this.authorRepository.update(id, {
      ...author,
      pictureUrl: author.pictureUrl ?? existingAuthor.pictureUrl,
    });

    const updatedAuthor: AuthorEntity | null =
      await this.authorRepository.findOne({
        where: { id: id as AuthorId },
      });

    return updatedAuthor;
  }

  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.delete(id);
  }
}
