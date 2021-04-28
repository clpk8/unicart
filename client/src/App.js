import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Buy from './pages/buy';
import Sell from './pages/Sell';
import Transactions from './pages/transactions';
import ForSale from './pages/forSale';
import Account from './pages/account';
import Products from './pages/products';

function App() {
  const getProducts = useStoreActions((actions) => actions.getProductListings);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const products = useStoreState((state) => state.products);
  console.log('Loaded products:', products);

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/home" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/buy" component={Buy} />
          <Route path="/sell" component={Sell} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/forSale" component={ForSale} />
          <Route path="/account" component={Account} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
