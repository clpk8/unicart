
import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages';
import Footer from './components/Footer';
// import Buy from './pages/buy';
// import Sell from './pages/sell';
// import Transactions from './pages/transactions';
// import ForSale from './pages/forSale';
// import Account from './pages/account';
  
function App() {
  return (
	<div className='App'>
		<Router>
      <Navbar />
      <Home />

      {/* <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/buy' component={Buy} />
        <Route path='/sell' component={Sell} />
        <Route path='/transactions' component={Transactions} />
        <Route path='/forSale' component={ForSale} />
        <Route path='/account' component={Account} />
      </Switch> */}
      <Footer />
		</Router>
	</div>
  );
}
  
export default App;