import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from './cartItem.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  discount: number;

  @Column()
  tax: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { eager: true })
  items: CartItem[];
}
