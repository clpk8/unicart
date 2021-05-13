import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { StoreProvider } from 'easy-peasy';
import { SnackbarProvider } from 'notistack';
import Button from '@material-ui/core/Button';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './services/store';

// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
