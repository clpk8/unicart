import React from 'react';
import { useStoreState } from 'easy-peasy';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Navbar() {
  const auth = useStoreState((state) => state.authToken);

  return (
    <nav id="nav-wrap">
      <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
      <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

      <div className="fullrow">
        <div className="four columns">
          <a className="logo" href="/home">
            <img className="logo-img" src="/assets/logo-circle.png" alt="logo" />
          </a>
        </div>

        {
          auth === ''
            ? (
              <div className="eight columns">
                <ul id="nav" className="nav">
                  {/* <li className="current"><a className="smoothscroll"
              href="/home"><h3>Home</h3></a></li> */}
                  <li><a className="smoothscroll" href="/signin"><h5>Log In</h5></a></li>
                  <li><a className="smoothscroll" href="/signup"><h5>Sign Up</h5></a></li>
                </ul>
              </div>
            )
            : (
              <div className="eight columns">
                <ul id="nav" className="nav">
                  <li><a className="smoothscroll" href="/sell"><h5>Sell</h5></a></li>
                  <li>
                    <a className="smoothscroll" href="/account">
                      <AccountCircleIcon style={{ color: '#4285F4', fontSize: 32, marginBottom: -10 }} />
                    </a>
                  </li>
                </ul>
              </div>
            )
        }
      </div>
    </nav>
  );
}

export default Navbar;
