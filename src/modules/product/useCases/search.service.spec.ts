import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { productsListMock } from 'src/mocks/product.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SearchService', () => {
  let searchService: SearchService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    searchService = module.get<SearchService>(SearchService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should return all products when search is empty', async () => {
    jest
      .spyOn(productRepository, 'find')
      .mockReturnValueOnce(Promise.resolve(productsListMock as Product[]));

    const result = await searchService.exec({ search: '' });

    expect(result).toEqual(productsListMock);
  });

  it('should search when search is not empty', async () => {
    jest
      .spyOn(productRepository, 'find')
      .mockReturnValueOnce(Promise.resolve(productsListMock as Product[]));

    const result = await searchService.exec({ search: 'A' });

    expect(result).toEqual(productsListMock);
  });
});
