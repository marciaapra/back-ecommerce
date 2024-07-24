import { Test } from '@nestjs/testing';

import { FindAllService } from '../useCases/findAll.service';
import { SearchService } from '../useCases/search.service';

import { ProductsController } from './products.controller';
import { productsListMock } from '../mocks/product.mock';

describe('ProductsController', () => {
  let productsController: ProductsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: FindAllService,
          useValue: {
            exec: jest.fn().mockImplementation(() => productsListMock),
          },
        },
        {
          provide: SearchService,
          useValue: {
            exec: jest.fn().mockImplementation(() => productsListMock),
          },
        },
      ],
    }).compile();

    productsController = moduleRef.get<ProductsController>(ProductsController);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      expect(await productsController.findAll()).toBe(productsListMock);
    });
  });

  describe('search', () => {
    it('should return an array of products with search', async () => {
      const params = { search: 'test' };

      expect(await productsController.search(params)).toBe(productsListMock);
    });
  });
});
