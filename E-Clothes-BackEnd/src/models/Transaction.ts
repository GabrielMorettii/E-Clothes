import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

import Product from './Product';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product_id: string;

  @Column('integer')
  quantity: number;

  @Column()
  total: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
