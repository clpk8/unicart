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
    setAuthToken: action((state, payload) => {
      state.authToken = payload;
    }),
    user: '',
    setLoggedInUser: action((state, payload) => {
      state.user = payload;
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
    // products
    products: [],
    setProducts: action((state, payload) => {
      state.products = payload;
    }),
  }),
  // {
  //   blacklist: ['products'],
  // },
  {
    allow: ['authToken'],
  },
);

export default store;
