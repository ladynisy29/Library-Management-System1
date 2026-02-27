import { Injectable } from '@nestjs/common';
import {
  BookDetailsModel,
  BookListItemModel,
  CreateSaleModel,
  CreateBookModel,
  FilterBooksModel,
  UpdateBookModel,
} from './book.model';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  public async getAllBooks(
    input?: FilterBooksModel,
  ): Promise<[BookListItemModel[], number]> {
    return this.bookRepository.getAllBooks(input);
  }

  public async getBookById(id: string): Promise<BookDetailsModel | null> {
    return this.bookRepository.getBookById(id);
  }

  public async createBook(book: CreateBookModel): Promise<BookDetailsModel> {
    return this.bookRepository.createBook(book);
  }

  public async updateBook(
    id: string,
    book: UpdateBookModel,
  ): Promise<BookDetailsModel | null> {
    return this.bookRepository.updateBook(id, book);
  }

  public async deleteBook(id: string): Promise<void> {
    await this.bookRepository.deleteBook(id);
  }

  public async createSale(
    bookId: string,
    input: CreateSaleModel,
  ): Promise<BookDetailsModel | null> {
    return this.bookRepository.createSale(bookId, input);
  }
}
