import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// eslint-disable-next-line react/prefer-stateless-function
class Banner extends Component {
  render() {
    return (
      <header id="home">
        <div className="row banner">
          <div className="banner-text">
            <h1 className="responsive-headline">College Buy & Sell</h1>
            <h1 className="responsive-headline">Made Simple</h1>
            <hr />
            <Button
              variant="contained"
              color="primary"
              style={{
                color: 'white',
              }}
              size="large"
              component={Link}
              to="/signup"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>
    );
  }
}

export default Banner;
