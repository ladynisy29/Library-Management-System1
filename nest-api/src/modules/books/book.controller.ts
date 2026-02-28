import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateBookDto,
  GetBooksDto,
  RecordSaleDto,
  UpdateBookDto,
} from './book.dto';
import { BookDetailsModel, GetBooksModel } from './book.model';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(@Query() input: GetBooksDto): Promise<GetBooksModel> {
    const [books, totalCount] = await this.bookService.getAllBooks({
      limit: input.limit,
      offset: input.offset,
      sortField: input.sortField,
      sortDirection: input.sortDirection,
    });

    return {
      data: books,
      totalCount,
    };
  }

  @Get(':id')
  public async getBook(@Param('id') id: string): Promise<BookDetailsModel> {
    const book = await this.bookService.getBookById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto): Promise<BookDetailsModel> {
    return this.bookService.createBook(createBookDto);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookDetailsModel> {
    const book = await this.bookService.updateBook(id, updateBookDto);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string): Promise<void> {
    return this.bookService.deleteBook(id);
  }

  @Post(':id/sales')
  async createSale(
    @Param('id') id: string,
    @Body() input: RecordSaleDto,
  ): Promise<BookDetailsModel> {
    const book = await this.bookService.createSale(id, input);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }
}
