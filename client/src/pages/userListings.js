/* eslint-disable react/prop-types */
import React from 'react';
import useFetch from 'react-fetch-hook';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ProductListing from '../components/productListing';

const useStyles = makeStyles({
  grid: {
    margin: 12,
  },
  container: {
    padding: 12,
  },
});

function UserProducts(props) {
  const { userid } = props;
  const classes = useStyles();

  const { isLoading, error, data } = useFetch(`/api/products/fetch/${userid}`);

  if (isLoading) return 'Loading... One Moment Please.';
  if (error) return 'Error loading this page!';
  const products = data;
  const content = products.map((product) => <ProductListing key={product.id} product={product} />);
  return (
    <div id="user-products-page" className={classes.container}>
      <h2>{`Product Listings for user ${userid}`}</h2>
      <Grid m={12} container spacing={3} className={classes.grid}>
        {content}
      </Grid>

    </div>
  );
}

export default UserProducts;
