import { createStore, action } from 'easy-peasy';

const store = createStore({
  cart: [],
  category: '',
  condition: '',
  setCart: action((state, payload) => {
    state.cart = payload;
  }),
  setCategory: action((state, payload) => {
    state.category = payload;
  }),
  setCondition: action((state, payload) => {
    state.condition = payload;
  }),
});

export default store;
