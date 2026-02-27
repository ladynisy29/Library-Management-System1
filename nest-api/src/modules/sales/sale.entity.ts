import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from '../books/entities/book.entity';
import { ClientEntity } from '../clients/client.entity';

@Entity('sales')
export class SaleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'book_id', type: 'uuid' })
  bookId: string;

  @Column({ name: 'client_id', type: 'uuid' })
  clientId: string;

  @Column({ name: 'sold_at', type: 'varchar' })
  soldAt: string;

  @ManyToOne(() => BookEntity, (book: BookEntity) => book.sales, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;

  @ManyToOne(() => ClientEntity, (client: ClientEntity) => client.sales, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;
}
