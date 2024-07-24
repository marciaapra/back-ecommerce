import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Product } from '../schemas/products.schema';

import { SearchDTO } from '../dtos/search.dto';

import { FindAllService } from '../useCases/findAll.service';
import { SearchService } from '../useCases/search.service';

@Controller('products')
@ApiTags('Produtos')
export class ProductsController {
  constructor(
    private findAllService: FindAllService,
    private searchService: SearchService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listagem de produtos' })
  async findAll(): Promise<Product[]> {
    return this.findAllService.exec();
  }

  @Get('/search')
  @ApiOperation({ summary: 'Buscar de produtos por nome/descrição' })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  async search(@Query() params: SearchDTO): Promise<Product[]> {
    return this.searchService.exec(params);
  }
}
