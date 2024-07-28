import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { FindAllService } from './findAll.service';
import { productsListMock } from 'src/mocks/product.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FindAllService', () => {
  let findAllService: FindAllService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    findAllService = module.get<FindAllService>(FindAllService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should return an array of all products', async () => {
    jest
      .spyOn(productRepository, 'find')
      .mockResolvedValueOnce(Promise.resolve(productsListMock as Product[]));

    const result = await findAllService.exec();

    expect(result).toEqual(productsListMock);
  });
});
