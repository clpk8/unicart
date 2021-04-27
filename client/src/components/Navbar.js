import React, { Component } from 'react';
import '../App.css';

// eslint-disable-next-line react/prefer-stateless-function
class Navbar extends Component {
  render() {
    return (
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
        <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

        <ul id="nav" className="nav">
          <li className="current"><a className="smoothscroll" href="/home"><h3>Home</h3></a></li>
          <li><a className="smoothscroll" href="/sell"><h3>Sell</h3></a></li>
          <li><a className="smoothscroll" href="/signin"><h3>Log In</h3></a></li>
          <li><a className="smoothscroll" href="/signup"><h3>Sign Up</h3></a></li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
