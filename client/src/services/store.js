import {
  createStore, action, thunk, debug, // persist,
} from 'easy-peasy';

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
      const products = await fetch('/products').then((res) => (res.json())).catch((error) => {
        console.error('Error:', error);
      });
      actions.setProducts(products);
    }),
  },
);

export default store;
