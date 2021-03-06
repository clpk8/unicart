/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useSnackbar } from 'notistack';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function ProductListing(props) {
  const { key, product } = props;
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // eslint-disable-next-line no-underscore-dangle
  const productUrl = `/Item/${product._id}`;

  const authToken = useStoreState((state) => state.authToken);
  const setCurrItem = useStoreActions((actions) => actions.setCurrItem);
  const setSeller = useStoreActions((actions) => actions.setSeller);

  async function handleViewListing(event) {
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
        enqueueSnackbar(err, {
          variant: 'error',
        });
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
        enqueueSnackbar(err, {
          variant: 'error',
        });
      });
  }

  let cardImage = <div>Image goes here</div>;

  if (product.photos && product.photos.length > 0) {
    cardImage = (
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        className={classes.media}
        image={product.photos[0]}
        title="Contemplative Reptile"
      />
    );
  } else {
    cardImage = (
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        className={classes.media}
        image="../../assets/noImageAvailable.jpg"
        title="Contemplative Reptile"
      />
    );
  }

  return (
    <Grid item xs={3} id={key} className="productListing" data-testid="product-listing-test">
      <Card variant="outlined" className={classes.root}>
        <CardActionArea>
          {cardImage}
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {product.title}
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="h4">
              {`$ ${product.price}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={handleViewListing}
          >
            View Listing
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductListing;
