import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from '../authors/author.entity';
import { BookEntity } from '../books/entities/book.entity';
import { SaleEntity } from '../sales/sale.entity';
import { ClientController } from './client.controller';
import { ClientEntity } from './client.entity';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      SaleEntity,
      BookEntity,
      AuthorEntity,
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientRepository, ClientService],
})
export class ClientModule {}
