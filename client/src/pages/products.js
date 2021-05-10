import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from 'react';
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

function getProducts() {
  return fetch('/api/products/fetch').then((res) => res.json());
}

function Products() {
  let products = useStoreState((state) => state.products);
  const setProducts = useStoreActions((action) => action.setProducts);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const classes = useStyles();

  if (!Array.isArray(products) || products.length < 1) {
    products = fakeProducts.products;
  }

  const content = products.map((product) => (
    <ProductListing key={product.id} product={product} />
  ));

  return (
    <div id="products-page" className={classes.container}>
      <h2>Product Listings</h2>
      <Grid m={12} container spacing={3} className={classes.grid}>
        {content}
      </Grid>
    </div>
  );
}

export default Products;
