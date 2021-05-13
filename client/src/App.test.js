import React from 'react';
import { render, screen } from '@testing-library/react';
import { StoreProvider } from 'easy-peasy';
import { SnackbarProvider } from 'notistack';
import Button from '@material-ui/core/Button';
import App from './App';
import store from './services/store';

// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

test('renders Log In text in navbar', () => {
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
