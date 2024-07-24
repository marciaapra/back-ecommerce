import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './controllers/products.controller';

import { Product, ProductSchema } from './schemas/products.schema';

import { FindAllService } from './useCases/findAll.service';
import { SearchService } from './useCases/search.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [FindAllService, SearchService],
})
export class ProductsModule {}
