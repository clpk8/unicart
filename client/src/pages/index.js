import React from 'react';
import { useStoreState } from 'easy-peasy';

import Banner from '../components/Banner';
import Products from './products';

function Home() {
  const auth = useStoreState((state) => state.authToken);

  return (
    <div id="home">
      {
        auth || auth === ''
          ? <Banner />
          : <div className="temp"><h4>Welcome Back!</h4></div>
      }
      <Products />
    </div>
  );
}

export default Home;
