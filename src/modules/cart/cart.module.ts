import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart.controller';

import { Cart } from './entities/cart.entity';

import { CreateService } from './useCases/create.service';
import { FindByIdService } from './useCases/findById.service';
import { CartItem } from './entities/cartItem.entity';
import { AddItemService } from './useCases/addItem.service';
import { UpdateItemService } from './useCases/updateItem.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemoveItemService } from './useCases/removeItem.service';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, Product])],
  controllers: [CartController],
  providers: [
    CreateService,
    FindByIdService,
    AddItemService,
    UpdateItemService,
    RemoveItemService,
  ],
})
export class CartModule {}
