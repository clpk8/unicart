import React from 'react';
// import { useStoreState, useStoreActions } from 'easy-peasy';

// import Button from '@material-ui/core/Button';
// import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
  },
  title: {
    textAlign: 'left',
  },
  titleName: {
    textAlign: 'left',
    fontSize: '20px',
  },

  valueTitle: {
    textAlign: 'left',
    borderBottom: '2px solid #209BF9',
  },

  value: {
    textAlign: 'left',
    fontSize: '20px',
    padding: '20px',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing(3),
    minWidth: 120,
  },
  description: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  titleContainer: {
    background: 'linear-gradient(45deg, #2180E7 30%, #209BF9 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 70,
    width: 300,
    padding: '0 30px',
  },

  bodyContainer: {
    border: 4,
    borderRadius: 3,
    color: 'black',
    height: 500,
    width: 300,
    padding: '0 30px',
  },
}));

function Item() {
  const classes = useStyles();

  return (
    <section id="item">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={0} sm={4} md={8} component={Paper} elevation={5} square>
          <h1>Galaxy S9</h1>
        </Grid>

        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={5} square>
          <h1>Galaxy S9</h1>
        </Grid>
      </Grid>
    </section>
  );
}

export default Item;
