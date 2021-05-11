import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import ProductListing from '../components/productListing';
import * as fakeProducts from '../resources/fakeProducts.json';

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    margin: theme.spacing(3, 7, 10, 7),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  formControl: {
    minWidth: 142,
  },
}));

function getProducts() {
  return fetch('/api/products/fetch')
    .then((response) => response.json())
    .then((data) => data);
}

function Products() {
  const classes = useStyles();

  let products = useStoreState((state) => state.products);
  const authToken = useStoreState((state) => state.authToken);
  const selectedCategory = useStoreState((state) => state.selectedCategory);
  const setProducts = useStoreActions((action) => action.setProducts);
  const setSelectedCategory = useStoreActions((action) => action.setSelectedCategory);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  if (!Array.isArray(products) || products.length < 1) {
    products = fakeProducts.products;
  }

  const content = products.map((product) => (
    <ProductListing key={product.id} product={product} />
  ));

  async function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);

    await fetch(`/api/products/fetch/${event.target.value}`, {
      method: 'GET',
      headers: {
        'auth-token': authToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div id="products-page" className={classes.container}>
      <div className="fullrow">
        <div className="three columns">
          <h2>Today&apos;s Picks</h2>
        </div>

        <div className="nine columns">
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory}
              onChange={(event) => handleCategoryChange(event)}
            >
              <MenuItem value="books">Books</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="miscellaneous">Miscellaneous</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <Grid m={12} container spacing={3} className={classes.grid}>
        {content}
      </Grid>
    </div>
  );
}

export default Products;
