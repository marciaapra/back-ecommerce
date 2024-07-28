import { Test, TestingModule } from '@nestjs/testing';
import { AddItemService } from './additem.service';
import { Cart } from '../entities/cart.entity';
import { AddItemDTO } from '../dtos/addItem.dto';
import { Repository } from 'typeorm';
import { CartItem } from '../entities/cartItem.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { productsMock } from 'src/mocks/product.mock';
import { cartItemMock, cartMock } from 'src/mocks/cart.mock';

describe('AddItemService', () => {
  let addItemService: AddItemService;
  let cartRepository: Repository<Cart>;
  let cartItemRepository: Repository<CartItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddItemService,
        {
          provide: getRepositoryToken(Cart),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CartItem),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: () => ({
              update: () => ({
                set: () => ({
                  where: () => ({
                    execute: jest.fn().mockResolvedValue(cartItemMock),
                  }),
                }),
              }),
              execute: jest.fn().mockResolvedValue(cartItemMock),
              set: jest.fn(),
              where: jest.fn(),
            }),
          },
        },
      ],
    }).compile();

    addItemService = module.get<AddItemService>(AddItemService);
    cartRepository = module.get<Repository<Cart>>(getRepositoryToken(Cart));
    cartItemRepository = module.get<Repository<CartItem>>(
      getRepositoryToken(CartItem),
    );
  });

  it('should throw an error if cart is not found', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValueOnce(null);
    const params: AddItemDTO = productsMock;
    await expect(addItemService.exec('invalid-id', params)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should create a new cart item if item does not exist in cart', async () => {
    jest
      .spyOn(cartRepository, 'findOne')
      .mockResolvedValueOnce(Promise.resolve(cartMock as Cart));
    jest.spyOn(cartItemRepository, 'findOne').mockResolvedValueOnce(null);
    jest
      .spyOn(cartItemRepository, 'save')
      .mockResolvedValueOnce(new CartItem());

    await addItemService.exec(cartMock.id, productsMock);

    expect(cartItemRepository.save).toHaveBeenCalled();
  });
});
