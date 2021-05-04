/* eslint-disable react/prop-types */
import React from 'react';
import useFetch from 'react-fetch-hook';

function UserProducts(props) {
  const { userid } = props;

  const { isLoading, error, data } = useFetch(`/api/products/fetch/${userid}`);

  if (isLoading) return 'Loading... One Moment Please.';
  if (error) return 'Error loading this page!';
  const products = data;
  console.log('id:', userid, 'products:', products);
  return (
    <div id="user-listings">
      {`User ${userid} has ${products.length} product(s)`}
      <br />
      Products:
      {JSON.stringify(products)}
    </div>
  );
}

export default UserProducts;
