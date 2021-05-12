import React from 'react';
import { render, screen } from '@testing-library/react';
import { createStore, StoreProvider } from 'easy-peasy';
import App from './App';
import store from './services/store';

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
  products: [],
  selectedCategory: '',
  currItem: {},
  seller: {},
};

// const store = createStore(model, {
//   mockActions: true,
// });

test('renders learn react link', () => {
  const app = (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );

  render(app);
  const element = screen.getByText(/Log in/i);
  expect(element).toBeInTheDocument();
});
