import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
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

function Sell() {
  const classes = useStyles();

  const category = useStoreState((state) => state.category);
  const setCategory = useStoreActions((actions) => actions.setCategory);
  const condition = useStoreState((state) => state.condition);
  const setConditon = useStoreActions((actions) => actions.setConditon);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleConditionChange = (event) => {
    setConditon(event.target.value);
  };

  return (
    <section id="sell">
      <div className="row">
        <div className="five columns">
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Typography className={classes.title} component="h1" variant="h5">
                  Item For Sale
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="price"
                    label="Price"
                    type="price"
                    id="price"
                  />
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="category-select">Category</InputLabel>
                    <Select
                      labelId="category-select-label"
                      id="category-select"
                      value={category}
                      onChange={handleCategoryChange}
                      label="Category"
                    >
                      <MenuItem value="books">Books</MenuItem>
                      <MenuItem value="clothing">Clothing</MenuItem>
                      <MenuItem value="electronics">Electronics</MenuItem>
                      <MenuItem value="miscellaneous">Miscellaneous</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="condition-select">Condition</InputLabel>
                    <Select
                      labelId="category-select-label"
                      id="category-select"
                      value={condition}
                      onChange={handleConditionChange}
                      label="Condition"
                    >
                      <MenuItem value="new">New</MenuItem>
                      <MenuItem value="likenew">Used - Like New</MenuItem>
                      <MenuItem value="good">Used - Good</MenuItem>
                      <MenuItem value="fair">Used - Fair</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="description"
                    className={classes.description}
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue=""
                    variant="outlined"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Next
                  </Button>
                </form>
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

export default Sell;
