import React, { } from 'react';
import './App.css';
import {
  BrowserRouter as Router, Switch, Route, useParams,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Account from './pages/account';
import AccountSaved from './pages/accountSaved';
import Buy from './pages/buy';
import Sell from './pages/Sell';
import Transactions from './pages/transactions';
import ForSale from './pages/forSale';
import Products from './pages/products';
import Item from './pages/item';
import UserAccount from './pages/userAccount';

function UserIdRouter() {
  const { userid } = useParams();
  return <UserAccount userid={userid} />;
}

function App() {
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
          <Route path="/account/:userid" component={UserIdRouter} />
          <Route path="/account" component={Account} />
          <Route path="/accountSaved" component={AccountSaved} />
          <Route path="/item" component={Item} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
