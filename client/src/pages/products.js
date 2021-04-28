// import { useStoreState } from 'easy-peasy';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProductListing from '../components/productListing';
import * as fakeProducts from '../resources/fakeProducts.json';

function Products() {
  let products = fetch('http://localhost:3001/products').then((res) => (res.json()));
  // const content = [];
  console.log('products1:', products);

  if (products.length < 1) {
    products = fakeProducts.products;
  }
  console.log('products2:', products);
  console.log('fakes:', fakeProducts.products);

  // eslint-disable-next-line no-underscore-dangle
  const content = products.map((product) => <ProductListing key={product._id} product={product} />);

  return (
    <div id="products-page">
      <Grid container spacing={3}>
        {content}
      </Grid>

    </div>
  );
}

export default Products;
