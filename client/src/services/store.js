import { createStore, action } from 'easy-peasy';

const store = createStore({
  cart: [],
  quizResult: {
    0: 'Location',
    1: 'Allegheny',
    2: 'unanswered',
    3: 'unanswered',
    4: 'unanswered',
    5: '',
    6: '',
  },
  setCart: action((state, payload) => {
    state.cart = payload;
  }),
})

export default store