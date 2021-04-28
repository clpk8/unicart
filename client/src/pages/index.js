import React from 'react';
import { useStoreState } from 'easy-peasy';

import Banner from '../components/Banner';

function Home() {
  const auth = useStoreState((state) => state.authToken);

  return (
    <div id="home">
      {
        auth === ''
          ? <Banner />
          : <div className="temp"><h1>User logged in</h1></div>
      }
    </div>
  );
}

export default Home;
