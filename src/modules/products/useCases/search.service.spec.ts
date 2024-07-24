import { Test } from '@nestjs/testing';

import { Model, Query } from 'mongoose';

import { getModelToken } from '@nestjs/mongoose';

import { SearchService } from './search.service';
import { ProductDocument } from '../schemas/products.schema';

describe('SearchService', () => {
  let searchService: SearchService;
  let productModel: Model<ProductDocument>;

  const productsListMock = [
    {
      name: 'Hidratante',
      price: 30,
      score: 4.5,
      image: '',
      description: 'Hidratante facial',
    },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: getModelToken('Product'),
          useValue: {
            find: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    searchService = moduleRef.get<SearchService>(SearchService);
    productModel = moduleRef.get<Model<ProductDocument>>(
      getModelToken('Product'),
    );
  });

  describe('exec', () => {
    it('should return an array of all products', async () => {
      jest.spyOn(productModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(productsListMock),
      } as unknown as Query<ProductDocument[], ProductDocument>);

      const params = { search: 'test' };

      const products = await searchService.exec(params);

      expect(products).toEqual(productsListMock);
    });
  });
});
