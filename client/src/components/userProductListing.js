/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  label: {
    fontSize: '13px',
  },
  button: {
    width: '100%',
    minWidth: '42px',
    color: '#000',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: '#fff',
    padding: '12px',
    borderRadius: '12px',
    margin: theme.spacing(0, 0, 5, 0),
  },
  productImage: {
    borderRadius: '12px',
  },
  imageTag: {
    maxHeight: '20vh',
  },
  actionButton: {
    margin: '0 auto',
    marginRight: '24px',
    padding: theme.spacing(0, 3, 0, 3),
    width: 'auto',
    minWidth: '42px',
    color: '#4285F4',
    backgroundColor: '#e1f5fe',
    borderRadius: '12px',
  },
}));

const iconStyles = {
  root: {
    width: 24,
    height: 24,
    marginTop: 12,
    marginBottom: 12,
    marginRight: 5,
  },
};

const IconShare = withStyles(iconStyles)(({ classes }) => <ShareIcon classes={classes} />);
const IconVisibility = withStyles(iconStyles)(({ classes }) => <VisibilityIcon classes={classes} />);

function UserProductListing(props) {
  const { product } = props;
  const classes = useStyles();
  const history = useHistory();

  const authToken = useStoreState((state) => state.authToken);
  const setCurrItem = useStoreActions((actions) => actions.setCurrItem);
  const setSeller = useStoreActions((actions) => actions.setSeller);

  // eslint-disable-next-line no-underscore-dangle
  const productUrl = `/Item/${product._id}`;
  const imgSrc = (product.photos.length > 0 ? product.photos[0] : '../../assets/noImageAvailable.jpg');

  async function handleViewDetails(event) {
    event.preventDefault();

    await fetch(`/api/users/${product.sellerId}`, {
      method: 'GET',
      headers: {
        'auth-token': authToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSeller(data);
      })
      .catch((err) => {
        alert(err);
      });

    // eslint-disable-next-line no-underscore-dangle
    await fetch(`/api/products/${product._id}`, {
      method: 'GET',
      headers: {
        'auth-token': authToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrItem(data);
        history.push(productUrl);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className={classes.card}>
      <div className="row">
        <div className="three columns">
          <div className={classes.productImage}>
            <img src={imgSrc} className={classes.imageTag} alt="book" />
          </div>
        </div>

        <div className="nine columns">
          <h4>{product.title}</h4>
          <h5>{`$${product.price} - ${product.condition}`}</h5>
          <p>{product.description}</p>

          <Button
            dense
            color="primary"
            classes={{ root: classes.actionButton, label: classes.label }}
            // eslint-disable-next-line no-underscore-dangle
            onClick={handleViewDetails}
          >
            <IconVisibility />
            View Listing
          </Button>

          <Button dense color="primary" classes={{ root: classes.actionButton, label: classes.label }}>
            <IconShare />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserProductListing;
