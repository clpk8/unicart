import { useStoreState, useStoreActions } from 'easy-peasy';
import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
// import * as fakeProducts from '../resources/fakeProducts.json';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '85vh',
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

function getItem() {
  return fetch('/api/products/:60909d055047a717a83a7fb4').then((res) => res.json());
}

function Item() {
  const item = useStoreState((state) => state.item);
  const setItem = useStoreActions((action) => action.setItem);
  useEffect(() => {
    getItem().then((data) => {
      setItem(data);
    });
  }, []);

  // const item = getItem();
  const classes = useStyles();
  return (
    <section id="Item">
      <div className="row">
        <div className="five columns">
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Box className={classes.titleContainer} component="span" height="1" m={4}>
                  <Typography className={classes.title} component="h1" variant="h5">
                    Item:
                  </Typography>
                  <Typography className={classes.titleName} component="h1" variant="h5">
                    {item.title}
                  </Typography>
                </Box>
                <Box className={classes.bodyContainer} component="span" m={1}>
                  <Typography className={classes.valueTitle} component="h1" variant="h5">
                    Price:
                  </Typography>
                  <Typography className={classes.value} component="h1" variant="h5">
                    {item.price}
                  </Typography>
                  <Typography className={classes.valueTitle} component="h1" variant="h5">
                    Catagory:
                  </Typography>
                  <Typography className={classes.value} component="h1" variant="h5">
                    {item.category}
                  </Typography>
                  <Typography className={classes.valueTitle} component="h1" variant="h5">
                    Condition:
                  </Typography>
                  <Typography className={classes.value} component="h1" variant="h5">
                    {item.condition}
                  </Typography>
                  <Typography className={classes.valueTitle} component="h1" variant="h5">
                    Description:
                  </Typography>
                  <Typography className={classes.value} component="h1" variant="h5">
                    {item.description}
                  </Typography>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Add to cart
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="seven columns">
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={5} square>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
              >
                <img src="/assets/book.jpg" alt="book" />
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
}

export default Item;
