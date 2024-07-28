import { Test, TestingModule } from '@nestjs/testing';
import { FindByIdService } from './findById.service';
import { Cart } from '../entities/cart.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { cartMock } from 'src/mocks/cart.mock';
import { NotFoundException } from '@nestjs/common';

describe('FindByIdService', () => {
  let findByIdService: FindByIdService;
  let cartRepository: Repository<Cart>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByIdService,
        {
          provide: getRepositoryToken(Cart),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    findByIdService = module.get<FindByIdService>(FindByIdService);
    cartRepository = module.get<Repository<Cart>>(getRepositoryToken(Cart));
  });

  it('should find and return a cart by id', async () => {
    jest
      .spyOn(cartRepository, 'findOne')
      .mockResolvedValueOnce(Promise.resolve(cartMock as Cart));

    const result = await findByIdService.exec('cart-id');

    expect(result).toEqual(cartMock);
  });

  it('should throw NotFoundException if cart not found', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValueOnce(null);

    await expect(findByIdService.exec('invalid-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
