/* eslint-disable react/prop-types */
import React, { } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
import VisibilityIcon from '@material-ui/icons/Visibility';

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

  return (
    <div className={classes.card}>
      <div className="row">
        <div className="three columns">
          <div className={classes.productImage}>
            <img src={product.photos[0]} alt="book" />
          </div>
        </div>

        <div className="nine columns">
          <h4>{product.title}</h4>
          <h5>{`$${product.price}`}</h5>
          <p>Lorem ipsum</p>

          <Button dense color="primary" classes={{ root: classes.actionButton, label: classes.label }}>
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
