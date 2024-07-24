import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Product } from '../schemas/products.schema';

import { SearchDTO } from '../dtos/search.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async exec(params: SearchDTO): Promise<Product[]> {
    const { search } = params;
    const query = { $regex: search, $options: 'i' };

    if (search) {
      return this.productModel
        .find({
          $or: [{ name: query }, { description: query }],
        })
        .exec();
    }

    return this.productModel.find().exec();
  }
}
