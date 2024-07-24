import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas/products.schema';
import { Model } from 'mongoose';

@Injectable()
export class FindAllService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async exec(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}
