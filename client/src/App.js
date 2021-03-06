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
import AccountSelling from './pages/accountSelling';
import AccountSaved from './pages/accountSaved';
import Sell from './pages/Sell';
import Item from './pages/item';
import UserAccount from './pages/userAccount';
import EditItem from './pages/EditItem';

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
          <Route path="/home" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/sell" component={Sell} />
          <Route path="/account/:userid" component={UserIdRouter} />
          <Route path="/account" component={AccountSelling} />
          <Route path="/accountSaved" component={AccountSaved} />
          <Route path="/item" component={Item} />
          <Route path="/edititem" component={EditItem} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
