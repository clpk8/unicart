import {
  createStore, action, thunk, debug, // persist,
} from 'easy-peasy';

const store = createStore(
  // persist({
  {
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

    // Sell
    setCategory: action((state, payload) => {
      state.category = payload;
    }),
    setCondition: action((state, payload) => {
      state.condition = payload;
    }),

    // cart (might not be necessary)
    cart: [],
    setCart: action((state, payload) => {
      state.cart = payload;
    }),

    // products
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
  // {
  //   blacklist: ['products'],
  // },
  {
    allow: ['authToken'],
  },
);

export default store;
