import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useSnackbar } from 'notistack';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Navbar() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const authToken = useStoreState((state) => state.authToken);
  const loggedInUser = useStoreState((state) => state.user);
  const addSellingProducts = useStoreActions((actions) => actions.addSellingProducts);
  const setSelectedCategory = useStoreActions((actions) => actions.setSelectedCategory);

  function handleHomeClick() {
    setSelectedCategory('');
    window.location.href = '/home';
  }

  async function handleProfileClick() {
    if (loggedInUser.selling.length === 0) {
      history.push('/account');
    }

    for (let i = 0; i < loggedInUser.selling.length; i += 1) {
      const id = loggedInUser.selling[i];

      /* eslint-disable no-await-in-loop */
      await fetch(`/api/products/${id}`, {
        method: 'GET',
        headers: {
          'auth-token': authToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          addSellingProducts(data);
          history.push('/account');
        })
        .catch((err) => {
          enqueueSnackbar(err, {
            variant: 'error',
          });
        });
    }
  }

  return (
    <nav id="nav-wrap" data-testid="navbar-test">
      <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
      <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

      <div className="fullrow">
        <div className="four columns">
          <button type="button" className="logo" onClick={handleHomeClick}>
            <img className="logo-img" src="/assets/logo-circle.png" alt="logo" />
          </button>
        </div>

        {
          authToken === ''
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
                    <button type="button" className="smoothscroll no-border" onClick={handleProfileClick}>
                      <AccountCircleIcon style={{ color: '#4285F4', fontSize: 32, marginBottom: -10 }} />
                    </button>
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
