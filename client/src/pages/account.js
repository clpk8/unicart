import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PlaylistAddCheckTwoToneIcon from '@material-ui/icons/PlaylistAddCheckTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import ShareIcon from '@material-ui/icons/Share';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

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
const ResumeIcon = withStyles(iconStyles)(({ classes }) => <PlaylistAddCheckTwoToneIcon classes={classes} />);
const EditIcon = withStyles(iconStyles)(({ classes }) => <EditTwoToneIcon classes={classes} />);
const DeleteIcon = withStyles(iconStyles)(({ classes }) => <DeleteOutlineTwoToneIcon classes={classes} />);
const IconShare = withStyles(iconStyles)(({ classes }) => <ShareIcon classes={classes} />);
const AddIcon = withStyles(iconStyles)(({ classes }) => <AddTwoToneIcon classes={classes} />);

function Account() {
  const classes = useStyles();

  return (
    <section id="account">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={2} md={2} className={classes.nav}>
          <h3 className={classes.navText}>Your Account</h3>

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
                  <Avatar className={classes.avatar}>OP</Avatar>
                </div>

                <div className="ten columns">
                  <h5>Roy Xu</h5>
                  <p>No Active Listings</p>
                </div>

                <Button dense color="primary" classes={{ root: classes.profileButton, label: classes.label }}>
                  <AddIcon />
                  Create New Listing
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

export default Account;
