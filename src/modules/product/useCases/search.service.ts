import { Injectable } from '@nestjs/common';

import { Product } from '../entities/product.entity';

import { SearchDTO } from '../dtos/search.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async exec(params: SearchDTO): Promise<Product[]> {
    const { search } = params;

    if (!search) return this.productRepository.find();

    return this.productRepository.find({
      where: [
        { name: Like(`%${search}%`) },
        { description: Like(`%${search}%`) },
      ],
    });
  }
}
