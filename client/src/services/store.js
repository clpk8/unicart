import { createStore, action } from 'easy-peasy';

const store = createStore({
  cart: [],
  setCart: action((state, payload) => {
    state.cart = payload;
  }),
});

export default store;
