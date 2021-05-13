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
    logout: action((state) => {
      state.authToken = '';
      state.user = {};
      state.currItem = {};
      state.seller = {};
      state.images = [];
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
    setImages: action((state, payload) => {
      state.images = payload;
    }),
    resetSellData: action((state) => {
      state.category = '';
      state.condition = '';
      state.title = '';
      state.description = '';
      state.price = '';
      state.imagePreview = '';
      state.image = '';
      state.selectedCategory = '';
    }),

    // Edit listing
    editTitle: action((state, payload) => {
      state.currItem.title = payload;
    }),
    editPrice: action((state, payload) => {
      state.currItem.price = payload;
    }),
    editCategory: action((state, payload) => {
      state.currItem.category = payload;
    }),
    editCondition: action((state, payload) => {
      state.currItem.condition = payload;
    }),
    editDescription: action((state, payload) => {
      state.currItem.description = payload;
    }),
    editImages: action((state, payload) => {
      state.currItem.images = payload;
    }),

    // products
    products: [],
    setProducts: action((state, payload) => {
      state.products = payload;
    }),
    selectedCategory: '',
    setSelectedCategory: action((state, payload) => {
      state.selectedCategory = payload;
    }),

    // Item
    currItem: {},
    seller: {},
    setCurrItem: action((state, payload) => {
      state.currItem = payload;
    }),
    setSeller: action((state, payload) => {
      state.seller = payload;
    }),
  }),
  // {
  //   blacklist: ['products'],
  // },
  {
    allow: ['authToken', 'user', 'sellingProducts', 'currItem', 'seller'],
  },
);

export default store;
