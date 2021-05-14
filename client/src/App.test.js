/* eslint-disable no-underscore-dangle */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { createStore, StoreProvider } from 'easy-peasy';
import { SnackbarProvider } from 'notistack';

import Button from '@material-ui/core/Button';
import App from './App';
import Navbar from './components/Navbar';
import Products from './pages/products';
import ProductListing from './components/productListing';
import Sell from './pages/Sell';
import SignUp from './pages/SignUp';
import Login from './pages/SignIn';
import UserAccount from './pages/userAccount';
import AccountSelling from './pages/accountSelling';
// import AccountSaved from './pages/accountSaved';
import Item from './pages/item';

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
    date: '2021-05-04T05:36:33.837Z',
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
    datePosted: '2021-04-20T18:25:43.511Z',
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
    datePosted: '2021-04-20T18:25:43.511Z',
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
  currItem: products[0],
  seller: users[0],
};

// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

test('renders Log In text in navbar', () => {
  const store = createStore(model, {
    mockActions: true,
  });

  const app = (
    <StoreProvider store={store}>
      <SnackbarProvider
        maxSnack={3}
        ref={notistackRef}
        action={(key) => (
          <Button onClick={onClickDismiss(key)}>
            Dismiss
          </Button>
        )}
      >
        <App />
      </SnackbarProvider>
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
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)}>
              Dismiss
            </Button>
          )}
        >
          <Navbar />
        </SnackbarProvider>
      </StoreProvider>
    );

    const { getByTestId } = render(navbar);

    expect(getByTestId('navbar-test')).toHaveTextContent('Log In');
    expect(getByTestId('navbar-test')).toHaveTextContent('Sign Up');
  });

  it('Should have the correct tabs in the nav bar for logged in', () => {
    const navbar = (
      <StoreProvider store={loggedInStore}>
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)}>
              Dismiss
            </Button>
          )}
        >
          <Navbar />
        </SnackbarProvider>
      </StoreProvider>
    );

    const { getByTestId } = render(navbar);

    expect(getByTestId('navbar-test')).toHaveTextContent('Sell');
  });

  it('Should list the products', () => {
    const productsPage = (
      <StoreProvider store={loggedInStore}>
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)}>
              Dismiss
            </Button>
          )}
        >
          <Products />
        </SnackbarProvider>
      </StoreProvider>
    );

    const { getByTestId } = render(productsPage);

    expect(getByTestId('product-test-id')).toHaveTextContent('Today\'s Picks');
    expect(getByTestId('product-test-id')).toHaveTextContent('Select Category');
  });

  it('Should show the products component', () => {
    const productsPage = (
      <StoreProvider store={loggedInStore}>
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)}>
              Dismiss
            </Button>
          )}
        >
          <Products />
        </SnackbarProvider>
      </StoreProvider>
    );

    const { getByTestId } = render(productsPage);

    expect(getByTestId('product-test-id')).toHaveTextContent('Today\'s Picks');
    expect(getByTestId('product-test-id')).toHaveTextContent('Select Category');
  });

  it('Should list a product properly', () => {
    const productListing = (
      <StoreProvider store={loggedInStore}>
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)}>
              Dismiss
            </Button>
          )}
        >
          <ProductListing product={products[0]} />
        </SnackbarProvider>
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
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)}>
              Dismiss
            </Button>
          )}
        >
          <Sell />
        </SnackbarProvider>
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
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)}>
              Dismiss
            </Button>
          )}
        >
          <SignUp />
        </SnackbarProvider>
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
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)}>
              Dismiss
            </Button>
          )}
        >
          <Login />
        </SnackbarProvider>
      </StoreProvider>
    );

    const { getByTestId } = render(signUpPage);

    expect(getByTestId('signin-test')).toHaveTextContent('Forgot password');
    expect(getByTestId('signin-test')).toHaveTextContent('Remember me');
  });
});

describe('Public profile page', () => {
  const store = createStore(loggedInModel, {
    mockActions: true,
  });

  const userid = users[0]._id;

  it('Should only list public profile details', () => {
    const publicProfile = (
      <StoreProvider store={store}>
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)}>
              Dismiss
            </Button>
          )}
        >
          <UserAccount userid={userid} />
        </SnackbarProvider>
      </StoreProvider>
    );

    const { getByTestId } = render(publicProfile);

    waitFor(() => {
      expect(getByTestId('public-test')).toHaveTextContent('Public Profile');
      expect(getByTestId('public-test')).toHaveTextContent('Shane');
      expect(getByTestId('public-test')).toHaveTextContent('sedasbac');
    });
  });
});

describe('User profile page', () => {
  const store = createStore(loggedInModel, {
    mockActions: true,
  });

  it('Should list logged user account page', () => {
    const accountPage = (
      <StoreProvider store={store}>
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)}>
              Dismiss
            </Button>
          )}
        >
          <Router>
            <AccountSelling />
          </Router>
        </SnackbarProvider>
      </StoreProvider>
    );

    const { getByTestId } = render(accountPage);

    expect(getByTestId('account-test')).toHaveTextContent('Your Account');
    expect(getByTestId('account-test')).toHaveTextContent('Shane');
    expect(getByTestId('account-test')).toHaveTextContent('sedasbac');
  });
});

describe('Item page', () => {
  const store = createStore(loggedInModel, {
    mockActions: true,
  });

  it('Should show an item listing properly', () => {
    const itemPage = (
      <StoreProvider store={store}>
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)}>
              Dismiss
            </Button>
          )}
        >
          <Router>
          <Item />
          </Router>
        </SnackbarProvider>
      </StoreProvider>
    );

    const { getByTestId } = render(itemPage);

    expect(getByTestId('item-test')).toHaveTextContent('Panasonic');
    expect(getByTestId('item-test')).toHaveTextContent('Description');
    expect(getByTestId('item-test')).toHaveTextContent('A new tv');
  });
});
