import React from 'react';
// import { useStoreState, useStoreActions } from 'easy-peasy';

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

const useStyles = makeStyles((theme) => ({
  root: {
    height: '85vh',
  },
  title: {
    textAlign: 'left',
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
}));

function Item() {
  const classes = useStyles();

  /*
  const category = useStoreState((state) => state.category);
  const setCategory = useStoreActions((actions) => actions.setCategory);
  const condition = useStoreState((state) => state.condition);
  const setCondition = useStoreActions((actions) => actions.setCondition);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };
*/
  return (
    <section id="Item">
      <div className="row">
        <div className="five columns">
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Box component="span" m={1}>
                  <Typography className={classes.title} component="h1" variant="h5">
                    Item:
                  </Typography>
                </Box>
                <Box component="span" m={1}>
                  <Typography className={classes.title} component="h1" variant="h5">
                    Price:
                  </Typography>
                </Box>
                <Box component="span" m={1}>
                  <Typography className={classes.title} component="h1" variant="h5">
                    Catagory:
                  </Typography>
                </Box>
                <Box component="span" m={1}>
                  <Typography className={classes.title} component="h1" variant="h5">
                    Condition:
                  </Typography>
                </Box>
                <Box component="span" m={1}>
                  <Typography className={classes.title} component="h1" variant="h5">
                    Description:
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
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
              <div className="preview-box">
                <img src="/assets/book.jpg" alt="book" />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
}

export default Item;
