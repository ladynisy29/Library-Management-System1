import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { AuthorEntity } from '../authors/author.entity';
import { ClientEntity } from '../clients/client.entity';
import { SaleEntity } from '../sales/sale.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookEntity,
      AuthorEntity,
      ClientEntity,
      SaleEntity,
    ]),
  ],
  controllers: [BookController],
  providers: [BookRepository, BookService],
})
export class BookModule {}
