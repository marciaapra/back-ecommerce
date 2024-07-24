import { Test } from '@nestjs/testing';

import { Model, Query } from 'mongoose';

import { getModelToken } from '@nestjs/mongoose';

import { FindAllService } from '../useCases/findAll.service';
import { ProductDocument } from '../schemas/products.schema';

describe('FindAllService', () => {
  let findAllService: FindAllService;
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
        FindAllService,
        {
          provide: getModelToken('Product'),
          useValue: {
            find: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    findAllService = moduleRef.get<FindAllService>(FindAllService);
    productModel = moduleRef.get<Model<ProductDocument>>(
      getModelToken('Product'),
    );
  });

  describe('exec', () => {
    it('should return an array of all products', async () => {
      jest.spyOn(productModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(productsListMock),
      } as unknown as Query<ProductDocument[], ProductDocument>);

      const products = await findAllService.exec();

      expect(products).toEqual(productsListMock);
    });
  });
});
