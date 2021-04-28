import { useStoreState } from 'easy-peasy';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ProductListing from '../components/productListing';
import * as fakeProducts from '../resources/fakeProducts.json';

const useStyles = makeStyles({
  grid: {
    margin: 12,
  },
  container: {
    padding: 12,
  },
});

function Products() {
  let products = useStoreState((state) => state.products);
  const classes = useStyles();
  console.log('products1:', products);

  if (products.length < 1) {
    products = fakeProducts.products;
  }
  console.log('products2:', products);
  console.log('fakes:', fakeProducts.products);

  // eslint-disable-next-line no-underscore-dangle
  const content = products.map((product) => <ProductListing key={product._id} product={product} />);

  return (
    <div id="products-page" className={classes.container}>
      <Grid m={12} container spacing={3} className={classes.grid}>
        {content}
      </Grid>

    </div>
  );
}

export default Products;