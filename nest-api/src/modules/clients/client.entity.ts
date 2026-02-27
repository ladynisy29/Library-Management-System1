import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SaleEntity } from '../sales/sale.entity';

export type ClientId = string & { __brand: 'Client' };

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ClientId;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email: string | null;

  @Column({ name: 'picture_url', type: 'varchar', nullable: true })
  pictureUrl: string | null;

  @OneToMany(() => SaleEntity, (sale: SaleEntity) => sale.client)
  sales: SaleEntity[];
}
