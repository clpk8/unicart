import { createStore, action, thunk, persist } from 'easy-peasy';
import * as fakeProducts from '../resources/fakeProducts.json';

const store = createStore(
  persist({
    cart: [],
    setCart: action((state, payload) => {
      state.cart = payload;
    }),

    products: [],
    setProducts: action((state, payload) => {
      state.products = payload;
    }),


    getProductListings: thunk(async (actions, _) => {
      const products = fakeProducts.products;
      actions.setProducts(products);
    }),
  })
)

export default store;
