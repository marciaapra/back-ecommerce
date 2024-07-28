import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Cart } from '../entities/cart.entity';

import { CreateService } from '../useCases/create.service';
import { CreateCartDTO } from '../dtos/createCart.dto';
import { FindByIdService } from '../useCases/findById.service';
import { AddItemService } from '../useCases/addItem.service';
import { AddItemDTO } from '../dtos/addItem.dto';
import { UpdateItemDTO } from '../dtos/updateItem.dto';
import { UpdateItemService } from '../useCases/updateItem.service';
import { RemoveItemService } from '../useCases/removeItem.service';

@Controller('cart')
@ApiTags('Carrinho de compras')
export class CartController {
  constructor(
    private createService: CreateService,
    private findByIdService: FindByIdService,
    private addItemService: AddItemService,
    private updateItemService: UpdateItemService,
    private removeItemService: RemoveItemService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Listagem de produtos' })
  async create(@Body() createCart: CreateCartDTO): Promise<Cart> {
    return this.createService.exec(createCart);
  }

  @Get('/:id')
  async getCart(@Param('id') id: string) {
    return this.findByIdService.exec(id);
  }

  @Post('/:id/item')
  async addItem(@Param('id') id: string, @Body() item: AddItemDTO) {
    return this.addItemService.exec(id, item);
  }

  @Patch('/:id/item/:idItem')
  async updateItem(
    @Param('id') id: string,
    @Param('idItem') idItem: string,
    @Body() item: UpdateItemDTO,
  ) {
    return this.updateItemService.exec(id, idItem, item);
  }

  @Delete('/:id/item/:idItem')
  async removeItem(@Param('id') id: string, @Param('idItem') idItem: string) {
    return this.removeItemService.exec(id, idItem);
  }
}
