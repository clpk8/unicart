import React, { } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
import UserListings from './pages/userListings';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/buy" component={Buy} />
          <Route path="/sell" component={Sell} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/forSale" component={ForSale} />
          <Route path="/account/:id/products" component={UserListings} />
          <Route path="/account" component={Account} />
          <Route path="/products" component={Products} />
          <Route path="/" exact component={Home} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
