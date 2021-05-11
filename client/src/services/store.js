/* eslint-disable no-underscore-dangle */
import { createStore, action, persist } from 'easy-peasy';

const store = createStore(
  persist({
    // Sign up and Log in
    registerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      school: '',
    },
    loginInfo: {
      email: '',
      password: '',
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
    setLoginEmail: action((state, payload) => {
      state.loginInfo.email = payload;
    }),
    setLoginPassword: action((state, payload) => {
      state.loginInfo.password = payload;
    }),

    // Auth Token
    authToken: '',
    user: {},
    setAuthInfo: action((state, payload) => {
      const { token, user } = payload;
      state.authToken = token;
      state.user = user;
    }),

    // NOT USED
    setAuthToken: action((state, payload) => {
      state.authToken = payload;
    }),

    // NOT USED
    setLoggedInUser: action((state, payload) => {
      state.user = payload;
    }),

    sellingProducts: [],
    addSellingProductId: action((state, payload) => {
      state.user.selling.push(payload);
    }),
    addSellingProducts: action((state, payload) => {
      if (state.sellingProducts.findIndex((x) => x._id === payload._id) === -1) {
        state.sellingProducts.push(payload);
      }
    }),

    // Sell
    setCategory: action((state, payload) => {
      state.category = payload;
    }),
    setCondition: action((state, payload) => {
      state.condition = payload;
    }),
    setTitle: action((state, payload) => {
      state.title = payload;
    }),
    setDescription: action((state, payload) => {
      state.description = payload;
    }),
    setPrice: action((state, payload) => {
      state.price = payload;
    }),
    setImagePreview: action((state, payload) => {
      state.imagePreview = payload;
    }),
    setImage: action((state, payload) => {
      state.image = payload;
    }),
    resetSellData: action((state) => {
      state.category = '';
      state.condition = '';
      state.title = '';
      state.description = '';
      state.price = '';
      state.imagePreview = '';
      state.image = '';
    }),

    // products
    products: [],
    setProducts: action((state, payload) => {
      state.products = payload;
    }),

    // Item
    currItem: {},
    setCurrItem: action((state, payload) => {
      state.currItem = payload;
    }),
  }),
  // {
  //   blacklist: ['products'],
  // },
  {
    allow: ['authToken', 'user', 'sellingProducts'],
  },
);

export default store;
