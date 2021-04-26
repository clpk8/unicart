import React from 'react';
import Col from 'react-bootstrap/Col';

function ProductListing(props) {
    const product = props.product;

    return (
        <Col xs={3} className="productListing">
            <h3>Product Name</h3>
            <h5>${product.price}</h5>
            <p>{product.description}</p>
        </Col>
    )
}

export default ProductListing;