import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  nav: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? '#FFF' : '#FFF',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  selectedButton: {
    margin: '0 auto',
    width: '100%',
    minWidth: '42px',
    color: '#fff',
    backgroundColor: '#4285F4',
    borderTopRightRadius: '15px',
    borderBottomRightRadius: '15px',
  },
  button: {
    margin: '0 auto',
    width: '100%',
    minWidth: '42px',
    color: '#000',
  },
  label: {
    fontSize: '14px',
  },
  icon: {
    fontSize: '12px !important',
    marginBottom: theme.spacing.unit,
  },
  dashboardGrid: {
    backgroundColor:
      theme.palette.type === 'light' ? '#F9FAFD' : '#F9FAFD',
  },
  dashboard: {
    padding: '0.5vh 2vw 0 2vw',
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
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

const SellingIcon = withStyles(iconStyles)(({ classes }) => <LocalOfferIcon classes={classes} />);
const SavedIcon = withStyles(iconStyles)(({ classes }) => <BookmarkIcon classes={classes} />);
const PurchasedIcon = withStyles(iconStyles)(({ classes }) => <ShoppingBasketIcon classes={classes} />);

function Account() {
  const classes = useStyles();

  return (
    <section id="account">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={2} md={2} className={classes.nav}>
          <Button dense color="primary" classes={{ root: classes.selectedButton, label: classes.label }}>
            <SellingIcon />
            Your Listings
          </Button>

          <Button dense color="primary" classes={{ root: classes.button, label: classes.label }}>
            <SavedIcon />
            Saved
          </Button>

          <Button dense color="primary" classes={{ root: classes.button, label: classes.label }}>
            <PurchasedIcon />
            Purchased Orders
          </Button>
        </Grid>

        <Grid
          item
          xs={12}
          sm={10}
          md={10}
          component={Paper}
          elevation={0}
          square
          className={classes.dashboardGrid}
        >
          <div className={classes.dashboard}>
            <h3>Hello Kristina,</h3>
            <h1>
              Solar panels are currently
              <span style={{ color: '#479D50' }}> active </span>
            </h1>
            <h5>Last Updated: 4:01pm</h5>

            <div className="dashboard-row">
              <div className="six columns no-padding margin-top-42">
                <h4>Today</h4>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

export default Account;
