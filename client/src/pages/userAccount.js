import React, { } from 'react';
import useFetch from 'react-fetch-hook';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import ProductCard from '../components/ProductCard';
import UserDetails from '../components/userDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '84vh',
  },
  nav: {
    padding: theme.spacing(5, 0, 0, 7),
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? '#FFF' : '#FFF',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
  },
  selectedButton: {
    width: '100%',
    minWidth: '42px',
    color: '#fff',
    backgroundColor: '#4285F4',
    borderBottomRightRadius: '15px',
    justifyContent: 'flex-start',
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
  background: {
    backgroundColor:
      theme.palette.type === 'light' ? '#F9FAFD' : '#F9FAFD',
  },
  mainSection: {
    padding: theme.spacing(3, 0, 0, 7),
    margin: '12px 12px 12px 12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  subSection: {
    padding: '0 0 0 0',
    margin: theme.spacing(7, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
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
  profileButton: {
    margin: '0 auto',
    marginRight: '24px',
    padding: theme.spacing(0, 3, 0, 3),
    width: '100%',
    minWidth: '42px',
    color: '#4285F4',
    backgroundColor: '#e1f5fe',
    borderRadius: '12px',
  },
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    margin: theme.spacing(0.5, 0, 5, 0),
  },
}));

function getUserData(userid) {
  const { isLoading, error, data } = useFetch(`/api/users/${userid}`);

  if (isLoading) {
    return ({
      firstName: 'Loading',
      lastName: 'Loading',
      email: 'loading@loading.edu',
      school: 'Loading',
      userid: 3,
    });
  }

  if (error) {
    return ({
      firstName: 'Error',
      lastName: 'Error',
      email: 'error@error.edu',
      school: 'Error',
      userid: 3,
    });
  }

  return data;
}

function UserAccount(props) {
  // eslint-disable-next-line react/prop-types
  const { userid } = props;
  const classes = useStyles();

  const { isLoading, error, data } = useFetch(`/api/products/fetch/${userid}`);

  if (isLoading) return 'Loading... One Moment Please.';
  if (error) return 'Error loading this page!';
  const products = data;

  const user = () => getUserData(userid);

  const content = (products.length > 0 ? products.map((product) => (
    <ProductCard product={product} />
  )) : <div className={classes.card}>No Product Listings</div>);

  return (
    <section id="user-account" data-testid="public-test">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={4} md={4} className={classes.nav}>
          <h3>Public Profile</h3>
          <UserDetails user={user} numListings={products.length} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={8}
          component={Paper}
          elevation={0}
          square
          className={classes.background}
        >
          <div className={classes.mainSection}>
            <div>
              <h3>Current Listings</h3>
            </div>
            {content}
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

export default UserAccount;
