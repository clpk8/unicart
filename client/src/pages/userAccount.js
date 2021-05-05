import React, { } from 'react';
import useFetch from 'react-fetch-hook';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import UserProductListing from '../components/userProductListing';
import UserDetails from '../components/userDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  nav: {
    paddingLeft: '5px',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? '#FFF' : '#FFF',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
  },
  navText: {
    paddingLeft: '5px',
    paddingBottom: '5px',
    marginTop: '15px',
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
    padding: '0 0 0 2vw',
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

function UserAccount(props) {
  // eslint-disable-next-line react/prop-types
  const { userid } = props;
  const classes = useStyles();

  const { isLoading, error, data } = useFetch(`/api/products/fetch/${userid}`);

  if (isLoading) return 'Loading... One Moment Please.';
  if (error) return 'Error loading this page!';
  const products = data;
  console.log(userid, products);

  const user = {
    firstName: 'Shane',
    lastName: 'Dasbach',
    email: 'sedasbac@andrew.cmu.edu',
    school: 'Carnegie Mellon',
    userid: 3,
  };

  const content = (products.length > 0 ? products.map((product) => (
    <UserProductListing key={product.id} product={product} />
  )) : <div className={classes.card}>No Product Listings</div>);

  return (
    <section id="user-account">
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12}>
          <h3 className={classes.navText}>{`${user.firstName} ${user.lastName}`}</h3>
        </Grid>
        <CssBaseline />
        <Grid item xs={12} sm={4} md={4} className={classes.nav}>
          <h3 className={classes.navText}>Details</h3>
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
              <h3>Product Listings</h3>
            </div>
            {content}

          </div>
        </Grid>

      </Grid>
    </section>
  );
}

export default UserAccount;
