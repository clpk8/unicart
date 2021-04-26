import React, {useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import Login from './pages/LogIn';
import Products from './pages/products';
import {useStoreActions, useStoreState} from 'easy-peasy';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Buy from './pages/buy';
// import Sell from './pages/sell';
// import Transactions from './pages/transactions';
// import ForSale from './pages/forSale';
// import Account from './pages/account';

function App() {
  const getProductListings = useStoreActions((actions) => actions.getProductListings);

  useEffect(() => {
    getProductListings();
  }, [getProductListings]);

  const products = useStoreState((state) => state.products);
  console.log('Loaded products:', products);

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path='/products' component={Products} />
          {/* <Route path='/buy' component={Buy} />
        <Route path='/sell' component={Sell} />
        <Route path='/transactions' component={Transactions} />
        <Route path='/forSale' component={ForSale} />
        <Route path='/account' component={Account} /> */}
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
