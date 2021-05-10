/* eslint-disable no-underscore-dangle */
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
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
    paddingBottom: '120px',
  },
  title: {
    textAlign: 'left',
  },
  paper: {
    margin: theme.spacing(4, 4),
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
  imageUpload: {
    marginTop: theme.spacing(3),
  },
}));

function Sell() {
  const classes = useStyles();
  const history = useHistory();
  const authToken = useStoreState((state) => state.authToken);
  const loggedInUser = useStoreState((state) => state.user);

  const category = useStoreState((state) => state.category);
  const setCategory = useStoreActions((actions) => actions.setCategory);
  const condition = useStoreState((state) => state.condition);
  const setCondition = useStoreActions((actions) => actions.setCondition);
  const price = useStoreState((state) => state.price);
  const setPrice = useStoreActions((actions) => actions.setPrice);
  const title = useStoreState((state) => state.title);
  const setTitle = useStoreActions((actions) => actions.setTitle);
  const description = useStoreState((state) => state.description);
  const setDescription = useStoreActions((actions) => actions.setDescription);
  const imagePreview = useStoreState((state) => state.imagePreview);
  const setImagePreview = useStoreActions((actions) => actions.setImagePreview);
  const image = useStoreState((state) => state.image);
  const setImage = useStoreActions((actions) => actions.setImage);
  const resetSellData = useStoreActions((actions) => actions.resetSellData);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    event.preventDefault();
    if (event.target.files.length === 0) return;

    const file = event.target.files[0];

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  async function addProductToSelling(payload) {
    await fetch('/api/users/addToSelling', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
      body: JSON.stringify(payload),
    })
      .catch((err) => {
        alert(err);
      });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (title === undefined || price === undefined) {
      alert('Title or price cannot be empty');
      return;
    }
    const userId = loggedInUser._id;
    const formData = new FormData();
    formData.append('photos', image);
    formData.append('category', category);
    formData.append('condition', condition);
    formData.append('price', price);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('sellerId', userId);

    await fetch('/api/products/create', {
      method: 'POST',
      headers: {
        'auth-token': authToken,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        addProductToSelling({
          userId,
          itemId: data._id,
        });

        resetSellData();
        history.push('/home');
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <section id="sell">
      <div className="row">
        <div className="five columns">
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <Typography
                  className={classes.title}
                  component="h1"
                  variant="h5"
                >
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
                    onChange={handleTitleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="price"
                    label="Price"
                    type="number"
                    id="price"
                    onChange={handlePriceChange}
                  />
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="category-select">Category</InputLabel>
                    <Select
                      labelId="category-select-label"
                      id="category-select"
                      value={category ?? ''}
                      onChange={handleCategoryChange}
                      label="Category"
                    >
                      <MenuItem value="books">Books</MenuItem>
                      <MenuItem value="clothing">Clothing</MenuItem>
                      <MenuItem value="electronics">Electronics</MenuItem>
                      <MenuItem value="miscellaneous">Miscellaneous</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="condition-select">Condition</InputLabel>
                    <Select
                      labelId="category-select-label"
                      id="category-select"
                      value={condition ?? ''}
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
                    onChange={handleDescriptionChange}
                  />
                  <div className={classes.imageUpload}>
                    <label htmlFor="btn-upload">
                      <input
                        id="btn-upload"
                        name="btn-upload"
                        style={{ display: 'none' }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e)}
                      />
                      <Button variant="outlined" component="span">
                        Choose Image
                      </Button>
                    </label>
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
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
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              component={Paper}
              elevation={6}
              square
            >
              <div className="preview-box">
                <img
                  src={imagePreview || '/assets/Preview.png'}
                  alt="book"
                  className="photo-preview"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
}

export default Sell;
