import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CreateService } from '../useCases/create.service';
import { FindByIdService } from '../useCases/findById.service';
import { AddItemService } from '../useCases/addItem.service';
import { UpdateItemService } from '../useCases/updateItem.service';
import { RemoveItemService } from '../useCases/removeItem.service';
import { CreateCartDTO } from '../dtos/createCart.dto';
import { cartMock } from 'src/mocks/cart.mock';
import { productsMock } from 'src/mocks/product.mock';

describe('CartController', () => {
  let cartController: CartController;
  let createService: CreateService;
  let findByIdService: FindByIdService;
  let addItemService: AddItemService;
  let updateItemService: UpdateItemService;
  let removeItemService: RemoveItemService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CreateService,
          useValue: {
            exec: jest.fn().mockImplementation(() => cartMock),
          },
        },
        {
          provide: FindByIdService,
          useValue: {
            exec: jest.fn().mockImplementation(() => cartMock),
          },
        },
        {
          provide: AddItemService,
          useValue: {
            exec: jest.fn().mockImplementation(() => cartMock),
          },
        },
        {
          provide: UpdateItemService,
          useValue: {
            exec: jest.fn().mockImplementation(() => cartMock),
          },
        },
        {
          provide: RemoveItemService,
          useValue: {
            exec: jest.fn().mockImplementation(() => cartMock),
          },
        },
      ],
    }).compile();

    cartController = moduleRef.get<CartController>(CartController);
    createService = moduleRef.get<CreateService>(CreateService);
    findByIdService = moduleRef.get<FindByIdService>(FindByIdService);
    addItemService = moduleRef.get<AddItemService>(AddItemService);
    updateItemService = moduleRef.get<UpdateItemService>(UpdateItemService);
    removeItemService = moduleRef.get<RemoveItemService>(RemoveItemService);
  });

  describe('create', () => {
    it('should create a cart', async () => {
      const createCartDto: CreateCartDTO = {
        discount: 0,
        tax: 15,
        items: [],
      };

      const result = await cartController.create(createCartDto);

      expect(result).toHaveProperty('id');
      expect(createService.exec).toHaveBeenCalledWith(createCartDto);
    });
  });

  describe('getCart', () => {
    it('should return a cart', async () => {
      const result = await cartController.getCart('cart-id');

      expect(result).toEqual(cartMock);
      expect(findByIdService.exec).toHaveBeenCalledWith('cart-id');
    });
  });

  describe('addItem', () => {
    it('should add an item', async () => {
      const result = await cartController.addItem('cart-id', productsMock);

      expect(result).toEqual(cartMock);
      expect(addItemService.exec).toHaveBeenCalledWith('cart-id', productsMock);
    });
  });

  describe('updateItem', () => {
    it('should update an item', async () => {
      const result = await cartController.updateItem(
        'cart-id',
        'cart-item-id',
        {
          quantity: 3,
        },
      );

      expect(result).toEqual(cartMock);
      expect(updateItemService.exec).toHaveBeenCalledWith(
        'cart-id',
        'cart-item-id',
        {
          quantity: 3,
        },
      );
    });
  });

  describe('removeItem', () => {
    it('should remove an item', async () => {
      const result = await cartController.removeItem('cart-id', 'cart-item-id');

      expect(result).toEqual(cartMock);
      expect(removeItemService.exec).toHaveBeenCalledWith(
        'cart-id',
        'cart-item-id',
      );
    });
  });
});
