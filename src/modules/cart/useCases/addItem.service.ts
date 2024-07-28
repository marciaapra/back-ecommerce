import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from '../entities/cart.entity';
import { AddItemDTO } from '../dtos/addItem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../entities/cartItem.entity';

@Injectable()
export class AddItemService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async exec(id: string, product: AddItemDTO): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { id } });

    if (!cart) throw new NotFoundException(`Cart not found`);

    const cartItem = await this.cartItemRepository.findOne({
      where: { product: { id: product.id }, cart: { id: cart.id } },
    });

    if (cartItem) {
      await this.cartItemRepository
        .createQueryBuilder()
        .update(CartItem)
        .set({ quantity: cartItem.quantity + 1 })
        .where('id = :id', { id: cartItem.id })
        .execute();
    } else {
      const newCartItem = {
        quantity: 1,
        price: product.price,
        product,
        cart,
      };

      await this.cartItemRepository.save(newCartItem);
    }

    return await this.cartRepository.findOne({ where: { id } });
  }
}
