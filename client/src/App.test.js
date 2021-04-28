import React from 'react';
import { render, screen } from '@testing-library/react';
import { StoreProvider } from 'easy-peasy';
import App from './App';
import store from './services/store';

test('renders learn react link', () => {
  render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
