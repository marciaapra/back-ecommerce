import { Product } from 'src/modules/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.cartItems, { eager: true })
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;
}
