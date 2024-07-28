import { Injectable, NotFoundException } from '@nestjs/common';
import { CartItem } from '../entities/cartItem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class RemoveItemService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async exec(id: string, idItem: string): Promise<Cart> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: idItem, cart: { id } },
    });

    if (!cartItem) throw new NotFoundException(`Item not found`);

    await this.cartItemRepository
      .createQueryBuilder()
      .delete()
      .from(CartItem)
      .where('id = :id', { id: cartItem.id })
      .execute();

    return await this.cartRepository.findOne({ where: { id } });
  }
}
