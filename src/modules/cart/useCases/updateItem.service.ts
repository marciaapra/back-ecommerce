import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CartItem } from '../entities/cartItem.entity';
import { UpdateItemDTO } from '../dtos/updateItem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class UpdateItemService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async exec(id: string, idItem: string, item: UpdateItemDTO): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { id } });
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: idItem },
    });

    if (!cart) throw new NotFoundException(`Cart not found`);
    if (!cartItem) throw new NotFoundException(`Item not found`);

    if (item.quantity < 1) throw new BadRequestException(`Quantity not valid`);

    await this.cartItemRepository
      .createQueryBuilder()
      .update(CartItem)
      .set({ ...cartItem, ...item })
      .where('id = :id', { id: cartItem.id })
      .execute();

    return await this.cartRepository.findOne({ where: { id } });
  }
}
