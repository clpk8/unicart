import React from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PlaylistAddCheckTwoToneIcon from '@material-ui/icons/PlaylistAddCheckTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import ShareIcon from '@material-ui/icons/Share';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import ProductCard from '../components/ProductCard';

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
    margin: theme.spacing(7, 5),
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
    margin: theme.spacing(1, 0, 1, 0),
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
const ResumeIcon = withStyles(iconStyles)(({ classes }) => <PlaylistAddCheckTwoToneIcon classes={classes} />);
const EditIcon = withStyles(iconStyles)(({ classes }) => <EditTwoToneIcon classes={classes} />);
const DeleteIcon = withStyles(iconStyles)(({ classes }) => <DeleteOutlineTwoToneIcon classes={classes} />);
const IconShare = withStyles(iconStyles)(({ classes }) => <ShareIcon classes={classes} />);
const AddIcon = withStyles(iconStyles)(({ classes }) => <AddTwoToneIcon classes={classes} />);
const ExitIcon = withStyles(iconStyles)(({ classes }) => <ExitToAppIcon classes={classes} />);

function AccountSelling() {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const authToken = useStoreState((state) => state.authToken);
  const loggedInUser = useStoreState((state) => state.user);
  const sellingProducts = useStoreState((state) => state.sellingProducts);
  const addSavedProducts = useStoreActions((actions) => actions.addSavedProducts);
  const logout = useStoreActions((actions) => actions.logout);

  function handleLogout(event) {
    event.preventDefault();
    logout();
    history.push('/home');
  }

  async function handleSavedClick() {
    if (loggedInUser.saved.length === 0) {
      history.push('/accountSaved');
    }

    for (let i = 0; i < loggedInUser.saved.length; i += 1) {
      const id = loggedInUser.saved[i];

      /* eslint-disable no-await-in-loop */
      await fetch(`/api/products/${id}`, {
        method: 'GET',
        headers: {
          'auth-token': authToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          addSavedProducts(data);
          history.push('/accountSaved');
        })
        .catch((err) => {
          enqueueSnackbar(err, {
            variant: 'error',
          });
        });
    }
  }

  return (
    <section id="account" data-testid="account-test">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={2} md={2} className={classes.nav}>
          <h3 className={classes.navText}>Your Account</h3>

          <Button dense color="primary" classes={{ root: classes.selectedButton, label: classes.label }}>
            <SellingIcon />
            Your Listings
          </Button>

          <Button
            dense
            color="primary"
            onClick={handleSavedClick}
            classes={{ root: classes.button, label: classes.label }}
          >
            <SavedIcon />
            Saved
          </Button>
        </Grid>

        <Grid
          item
          xs={10}
          sm={7}
          md={7}
          component={Paper}
          elevation={0}
          square
          className={classes.background}
        >
          <div className={classes.mainSection}>
            <div className={classes.card}>
              <h3>Your Listings</h3>
              <h5>
                {loggedInUser.selling.length === 0
                  ? 'No Active Listings'
                  : `${loggedInUser.selling.length} Current Listings`}
              </h5>
            </div>

            {sellingProducts.map((product) => (
              <ProductCard
                product={product}
              />
            ))}

            <div className={classes.card}>
              <h5>Example Listings</h5>
            </div>

            <div className={classes.card}>
              <div className="row">
                <div className="three columns">
                  <div className={classes.productImage}>
                    <img src="/assets/book.jpg" alt="book" />
                  </div>
                </div>

                <div className="nine columns">
                  <h4>Calculus Textbook</h4>
                  <h5>$12</h5>
                  <p>Sold &middot; Posted 05/01/2021</p>

                  <Button dense color="primary" classes={{ root: classes.actionButton, label: classes.label }}>
                    <ResumeIcon />
                    Mark as Available
                  </Button>

                  <Button dense color="primary" classes={{ root: classes.actionButton, label: classes.label }}>
                    <IconShare />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            <div className={classes.card}>
              <div className="row">
                <div className="three columns">
                  <div className={classes.productImage}>
                    <img src="/assets/book.jpg" alt="book" />
                  </div>
                </div>

                <div className="nine columns">
                  <h4>Calculus Textbook</h4>
                  <h5>$12</h5>
                  <p>Draft</p>

                  <Button dense color="primary" classes={{ root: classes.actionButton, label: classes.label }}>
                    <EditIcon />
                    Continue
                  </Button>

                  <Button dense color="primary" classes={{ root: classes.actionButton, label: classes.label }}>
                    <DeleteIcon />
                    Delete Draft
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid
          item
          xs={2}
          sm={3}
          md={3}
          component={Paper}
          elevation={0}
          square
          className={classes.background}
        >
          <div className={classes.subSection}>
            <div className={classes.card}>
              <h4>Your Public Profile</h4>

              <div className="row">
                <div className="two columns">
                  <Avatar
                    className={classes.avatar}
                  >
                    {`${loggedInUser.firstName[0]}${loggedInUser.lastName[0]}`}
                  </Avatar>
                </div>

                <div className="ten columns">
                  <h5>{`${loggedInUser.firstName} ${loggedInUser.lastName}`}</h5>
                  <p className="no-margin">{`${loggedInUser.email}`}</p>
                  <p className="no-margin">{`${loggedInUser.school}`}</p>
                </div>

                <Button
                  dense
                  color="primary"
                  classes={{ root: classes.profileButton, label: classes.label }}
                  component={RouterLink}
                  to="/sell"
                >
                  <AddIcon />
                  Create New Listing
                </Button>

                <Button
                  dense
                  color="primary"
                  classes={{ root: classes.profileButton, label: classes.label }}
                  onClick={handleLogout}
                >
                  <ExitIcon />
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

export default AccountSelling;
