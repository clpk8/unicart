/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import DetailsIcon from '@material-ui/icons/Details';
import ShareIcon from '@material-ui/icons/Share';
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
    marginTop: '22px',
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

const IconShare = withStyles(iconStyles)(({ classes }) => <ShareIcon classes={classes} />);
const IconDetails = withStyles(iconStyles)(({ classes }) => <DetailsIcon classes={classes} />);

export default function ProductCard(props) {
  const classes = useStyles();
  const {
    title, price, category, condition,
  } = props;

  return (
    <div className={classes.card}>
      <div className="row">
        <div className="three columns">
          <div className={classes.productImage}>
            <img src="/assets/book.jpg" alt="book" />
          </div>
        </div>

        <div className="nine columns">
          <h4>{`${title} - $${price}`}</h4>
          <p className="no-margin">{`Category: ${category}`}</p>
          <p className="no-margin">{`Condition: ${condition}`}</p>

          <Button dense color="primary" classes={{ root: classes.actionButton, label: classes.label }}>
            <IconDetails />
            See Detail
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
