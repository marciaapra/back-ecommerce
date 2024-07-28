import { productsMock } from './product.mock';

const cartItemMock = {
  id: 'cart-item-id',
  quantity: 3,
  price: 25,
  product: productsMock,
};

const cartMock = {
  id: 'cart-id',
  discount: 30,
  tax: 15,
  items: [cartItemMock],
};

const cartListMock = [cartMock];

export { cartMock, cartListMock, cartItemMock };
