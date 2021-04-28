import {
  createStore, action, thunk, debug, // persist,
} from 'easy-peasy';
import * as fakeProducts from '../resources/fakeProducts.json';

const store = createStore(
  // persist({
  {
    cart: [],
    setCart: action((state, payload) => {
      state.cart = payload;
    }),

    products: [],
    setProducts: action((state, payload) => {
      state.products = payload;
      console.log(debug(state));
    }),

    // eslint-disable-next-line no-unused-vars
    getProductListings: thunk(async (actions, _) => {
      const products = await fetch('http://localhost:3001/products').then((res) => (res.json())).catch((error) => {
        console.error('Error:', error);
      });
      console.log('Products:', products);
      if (products.length === 0) { // use fake data
        actions.setProducts(fakeProducts.products);
        console.log('No products returned from API, using dummy product data');
      } else {
        actions.setProducts(products);
      }
    }),
  },
);

export default store;
