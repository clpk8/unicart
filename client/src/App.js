
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import Buy from './pages/buy';
import Sell from './pages/sell';
import Transactions from './pages/transactions';
import ForSale from './pages/forSale';
import Account from './pages/account';

  
function App() {
  return (
	<div className='App'>
		<Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/buy' component={Buy} />
        <Route path='/sell' component={Sell} />
        <Route path='/transactions' component={Transactions} />
        <Route path='/forSale' component={ForSale} />
        <Route path='/account' component={Account} />
      </Switch>
		</Router>
	</div>
  );
}
  
export default App;