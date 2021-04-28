import { createStore, action } from 'easy-peasy';

const store = createStore({
  registerInfo: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    school: '',
  },
  setFirstName: action((state, payload) => {
    state.registerInfo.firstName = payload;
  }),
  setLastName: action((state, payload) => {
    state.registerInfo.lastName = payload;
  }),
  setEmail: action((state, payload) => {
    state.registerInfo.email = payload;
  }),
  setPassword: action((state, payload) => {
    state.registerInfo.password = payload;
  }),
  setSchool: action((state, payload) => {
    state.registerInfo.school = payload;
  }),

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
