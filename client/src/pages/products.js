import { useStoreState } from 'easy-peasy';
import React from 'react';
import ProductListing from '../components/productListing';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Products() {

  const products = useStoreState((state) => state.products);
  // const content = [];

  const content = products.map((product) => <ProductListing key={product._id} product={product} />)


  return (
    <div id="products-page">
      <Container>
        <Row>
          {content}
        </Row>
      </Container>
      
    </div>
  );
}

export default Products;