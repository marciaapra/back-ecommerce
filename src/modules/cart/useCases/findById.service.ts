import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from '../entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FindByIdService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async exec(id: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id },
    });

    if (!cart) throw new NotFoundException(`Cart not found`);

    return cart;
  }
}
