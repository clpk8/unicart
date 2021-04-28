/* eslint-disable react/prop-types */
import React from 'react';
import Grid from '@material-ui/core/Grid';

function ProductListing(props) {
  const { product } = props;
  console.log('Product:', product);

  return (
    <Grid item xs={3} className="productListing">
      <h3>{product.title}</h3>
      <h5>
        $
        {product.price}
      </h5>
      <p>{product.description}</p>
    </Grid>
  );
}

export default ProductListing;
