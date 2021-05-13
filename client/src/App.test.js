import React from 'react';
import { render, screen } from '@testing-library/react';
import { createStore, StoreProvider } from 'easy-peasy';
import App from './App';
import Navbar from './components/Navbar';
import Products from './pages/products';
import ProductListing from './components/productListing';
import Sell from './pages/Sell';
import SignUp from './pages/SignUp';
import Login from './pages/SignIn';

const users = [
  {
    _id: '6090dd61886cf45a35ec4223',
    buying: [],
    selling: ['609a9407f446cd5c2973beda'],
    firstName: 'Shane',
    lastName: 'Dasbach',
    email: 'sedasbac@andrew.cmu.edu',
    password: '$2a$10$dxW456CDlxVqkcCcRcyJPu5RMvBeJEgkloH7V7MseeWfkeYvR0KS6',
    school: 'Carnegie Mellon',
    date: { $date: '2021-05-04T05:36:33.837Z' },
    reviews: [],
    __v: 0,
  },
];

const products = [
  {
    _id: '608c61b296a2f0b4f2225b93',
    photos: ['https://target.scene7.com/is/image/Target/GUEST_194094b2-af7c-4c2b-ad2c-2dd85f75995e'],
    tags: [],
    category: 'TV',
    condition: 'new',
    datePosted: { $date: '2021-04-20T18:25:43.511Z' },
    dateSold: null,
    description: 'A new tv',
    paidFor: false,
    price: 100,
    buyerId: null,
    sellerId: '6090dd61886cf45a35ec4223',
    title: 'Panasonic TV',
    __v: 0,
  },
  {
    _id: '608c61b296a2f0b4f2225b96',
    photos: [],
    tags: [],
    category: 'Boat',
    condition: 'used',
    datePosted: { $date: '2021-04-20T18:25:43.511Z' },
    dateSold: null,
    description: 'A used boatski',
    paidFor: false,
    price: 10000,
    buyerId: null,
    sellerId: '609aa2e3a37f3c66f2df32ea',
    title: 'Issa Boat',
    __v: 0,
  },
];

const model = {
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
  authToken: '',
  user: {},
  sellingProducts: [],
  products,
  selectedCategory: '',
  currItem: {},
  seller: {},
};

const loggedInModel = {
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
  authToken: '609aa2e3a37f3c66f2df32ea',
  user: users[0],
  sellingProducts: [],
  products,
  selectedCategory: '',
  currItem: {},
  seller: {},
};

test('renders learn react link', () => {
  const store = createStore(model, {
    mockActions: true,
  });

  const app = (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );

  render(app);
  const element = screen.getByText(/Log in/i);
  expect(element).toBeInTheDocument();
});

describe('Home page', () => {
  const store = createStore(model, {
    mockActions: true,
  });

  const loggedInStore = createStore(loggedInModel, {
    mockActions: true,
  });

  it('Should have the correct tabs in the nav bar for not logged in', () => {
    const navbar = (
      <StoreProvider store={store}>
        <Navbar />
      </StoreProvider>
    );

    const { getByTestId } = render(navbar);

    expect(getByTestId('navbar-test')).toHaveTextContent('Log In');
    expect(getByTestId('navbar-test')).toHaveTextContent('Sign Up');
  });

  it('Should have the correct tabs in the nav bar for logged in', () => {
    const navbar = (
      <StoreProvider store={loggedInStore}>
        <Navbar />
      </StoreProvider>
    );

    const { getByTestId } = render(navbar);

    expect(getByTestId('navbar-test')).toHaveTextContent('Sell');
  });

  it('Should list the products', () => {
    const productsPage = (
      <StoreProvider store={loggedInStore}>
        <Products />
      </StoreProvider>
    );

    const { getByTestId } = render(productsPage);

    expect(getByTestId('product-test-id')).toHaveTextContent('Today\'s Picks');
    expect(getByTestId('product-test-id')).toHaveTextContent('Select Category');
  });

  it('Should show the products component', () => {
    const productsPage = (
      <StoreProvider store={loggedInStore}>
        <Products />
      </StoreProvider>
    );

    const { getByTestId } = render(productsPage);

    expect(getByTestId('product-test-id')).toHaveTextContent('Today\'s Picks');
    expect(getByTestId('product-test-id')).toHaveTextContent('Select Category');
  });

  it('Should list a product properly', () => {
    const productListing = (
      <StoreProvider store={loggedInStore}>
        <ProductListing product={products[0]} />
      </StoreProvider>
    );

    const { getByTestId } = render(productListing);

    expect(getByTestId('product-listing-test')).toHaveTextContent('Panasonic TV');
    expect(getByTestId('product-listing-test')).toHaveTextContent('100');
  });
});

describe('Sell page', () => {
  const loggedInStore = createStore(loggedInModel, {
    mockActions: true,
  });

  it('Should ask for the title', () => {
    const sellPage = (
      <StoreProvider store={loggedInStore}>
        <Sell />
      </StoreProvider>
    );

    const { getByTestId } = render(sellPage);

    expect(getByTestId('sell-test')).toHaveTextContent('Title');
  });
});

describe('Sign up page', () => {
  const store = createStore(model, {
    mockActions: true,
  });

  it('Should ask to sign up and if they already have an account', () => {
    const signUpPage = (
      <StoreProvider store={store}>
        <SignUp />
      </StoreProvider>
    );

    const { getByTestId } = render(signUpPage);

    expect(getByTestId('signup-test')).toHaveTextContent('Sign Up');
    expect(getByTestId('signup-test')).toHaveTextContent('Already have an account');
  });
});

describe('Sign in page', () => {
  const store = createStore(model, {
    mockActions: true,
  });

  it('Should have the correct tabs in the nav bar for not logged in', () => {
    const signUpPage = (
      <StoreProvider store={store}>
        <Login />
      </StoreProvider>
    );

    const { getByTestId } = render(signUpPage);

    expect(getByTestId('signin-test')).toHaveTextContent('Forgot password');
    expect(getByTestId('signin-test')).toHaveTextContent('Remember me');
  });
});
