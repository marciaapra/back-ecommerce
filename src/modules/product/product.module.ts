import { Module } from '@nestjs/common';

import { ProductController } from './controllers/product.controller';

import { Product } from './entities/product.entity';

import { FindAllService } from './useCases/findAll.service';
import { SearchService } from './useCases/search.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  exports: [TypeOrmModule],
  controllers: [ProductController],
  providers: [FindAllService, SearchService],
})
export class ProductModule {}
