import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from '../entities/cart.entity';
import { CreateCartDTO } from '../dtos/createCart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../entities/cartItem.entity';
import { Product } from 'src/modules/product/entities/product.entity';

@Injectable()
export class CreateService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async exec(cart: CreateCartDTO): Promise<Cart> {
    const newCart = await this.cartRepository.save(cart);

    const items = cart.items.map(async (item: CartItem) => {
      const product = await this.productRepository.findOne({
        where: { id: item.product.id },
      });

      if (!product) throw new NotFoundException(`Product not found`);

      await this.cartItemRepository.save({ ...item, cart: newCart });
    });

    try {
      await Promise.all(items);
      return this.cartRepository.findOne({
        where: { id: newCart.id },
      });
    } catch (error) {
      await this.cartRepository
        .createQueryBuilder()
        .delete()
        .from(Cart)
        .where('id = :id', { id: newCart.id })
        .execute();
      throw error;
    }
  }
}
