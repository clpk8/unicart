import React from 'react';
import { useStoreState } from 'easy-peasy';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
  },
  imagePanel: {
    minHeight: '90vh',
    maxWidth: '100%',
  },
  media: {
    height: '50%',
    width: 'auto',
    position: 'center',
  },
  info: {
    padding: theme.spacing(7),
  },
  description: {
    margin: theme.spacing(2, 0),
  },
  button: {
    margin: theme.spacing(2, 0),
  },
}));

function Item() {
  const classes = useStyles();

  const product = useStoreState((state) => state.currItem);

  let cardImage = <div>Image goes here</div>;

  if (product.photos.length < 1) {
    cardImage = (
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        className={classes.media}
        image="../../assets/noImageAvailable.jpg"
        title="Contemplative Reptile"
      />
    );
  } else {
    cardImage = (
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        className={classes.media}
        image={product.photos[0]}
        title="Contemplative Reptile"
      />
    );
  }

  return (
    <section id="item">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid
          container
          xs={0}
          sm={4}
          md={8}
          component={Paper}
          elevation={5}
          square
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.imagePanel}
        >
          {cardImage}
        </Grid>

        <Grid
          container
          xs={12}
          sm={8}
          md={4}
          component={Paper}
          elevation={5}
          square
          spacing={0}
          direction="column"
          alignItems="left"
          justify="center"
          className={classes.info}
        >
          <Typography gutterBottom variant="h4" component="h4">
            {product.title}
          </Typography>

          <Typography gutterBottom variant="h5" component="h5">
            {`$${product.price}`}
          </Typography>

          <Typography gutterBottom variant="subtitle1" component="h6">
            {`Category: ${product.category}`}
          </Typography>

          <Typography gutterBottom variant="subtitle1" component="h6">
            {`Condition: ${product.condition}`}
          </Typography>

          <Divider orientation="horizontal" />

          <Typography gutterBottom variant="h6" component="h6" className={classes.description}>
            Seller&apos;s Description
          </Typography>

          <Typography gutterBottom variant="body1" component="span">
            {product.description}
          </Typography>

          <Divider orientation="horizontal" />

          <Typography gutterBottom variant="h6" component="h6" className={classes.description}>
            Seller Information
          </Typography>

          <Button variant="contained" color="primary" className={classes.button}>
            Contact Seller
          </Button>
        </Grid>
      </Grid>
    </section>
  );
}

export default Item;
