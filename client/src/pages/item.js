import React from 'react';
import { useStoreState } from 'easy-peasy';
import Carousel from 'react-material-ui-carousel';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
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
    height: '60vh',
    width: '100vh',
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
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    margin: theme.spacing(0.5, 0, 5, 0),
  },
}));

function Item() {
  const classes = useStyles();

  const product = useStoreState((state) => state.currItem);
  console.log(product.photos[0]);
  const seller = useStoreState((state) => state.seller);

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
      <Carousel>
        {product.photos.map((item, i) => (
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.media}
            image={product.photos[i]}
            title="Contemplative Reptile"
          />
        ))}
      </Carousel>
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

          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            className={classes.description}
          >
            Seller&apos;s Description
          </Typography>

          <Typography gutterBottom variant="body1" component="span">
            {product.description}
          </Typography>

          {seller && (
            <>
              <Divider orientation="horizontal" />

              <Typography
                gutterBottom
                variant="h6"
                component="h6"
                className={classes.description}
              >
                Seller Information
              </Typography>

              <div className="row">
                <div className="two columns">
                  <Avatar className={classes.avatar}>
                    {`${seller.firstName[0]}${seller.lastName[0]}`}
                  </Avatar>
                </div>

                <div className="ten columns">
                  <Typography variant="subtitle1" component="h6">
                    {`${seller.firstName} ${seller.lastName}`}
                  </Typography>

                  <Typography variant="subtitle2" component="h6">
                    {`Member since ${seller.date.slice(0, 10)}`}
                  </Typography>
                </div>
              </div>
            </>
          )}

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Contact Seller
          </Button>
        </Grid>
      </Grid>
    </section>
  );
}

export default Item;
