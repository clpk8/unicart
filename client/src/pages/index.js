import React, { Component } from 'react';
import Banner from '../components/Banner';

// eslint-disable-next-line react/prefer-stateless-function
class Home extends Component {
  render() {
    return (
      <div id="home">
        <Banner />
      </div>
    );
  }
}

export default Home;
