/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { DropzoneArea } from 'material-ui-dropzone';

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

import { useSnackbar } from 'notistack';

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

function EditItem() {
  const classes = useStyles();
  const history = useHistory();
  const authToken = useStoreState((state) => state.authToken);
  const { enqueueSnackbar } = useSnackbar();

  const currItem = useStoreState((state) => state.currItem);
  const {
    title, price, category, condition, description,
  } = currItem;

  const setTitle = useStoreActions((actions) => actions.editTitle);
  const setPrice = useStoreActions((actions) => actions.editPrice);
  const setCategory = useStoreActions((actions) => actions.editCategory);
  const setCondition = useStoreActions((actions) => actions.editCondition);
  const setDescription = useStoreActions((actions) => actions.editDescription);
  const resetSellingProducts = useStoreActions((actions) => actions.resetSellingProducts);

  const setImages = useStoreActions((actions) => actions.editImages);

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

  const handleImageDropZone = (files) => {
    setImages(files);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (title === undefined || price === undefined) {
      alert('Title or price cannot be empty');
      return;
    }
    // const userId = loggedInUser._id;
    const formData = new FormData();
    if (currItem.photos) {
      currItem.photos.forEach((element) => {
        formData.append('photos', element);
      });
    }

    formData.append('id', currItem._id);
    formData.append('category', category);
    formData.append('condition', condition);
    formData.append('price', price);
    formData.append('title', title);
    formData.append('description', description);

    await fetch('/api/products/editListing', {
      method: 'POST',
      headers: {
        'auth-token': authToken,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        enqueueSnackbar('Your product has been updated!', {
          variant: 'success',
        });
        // setTimeout(closeSnackbar(), 10000);
        resetSellingProducts();
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
                  Edit Listing
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
                    defaultValue={title}
                    InputLabelProps={{ shrink: true }}
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
                    defaultValue={price}
                    InputLabelProps={{ shrink: true }}
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
                      defaultValue={category}
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
                      defaultValue={condition}
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
                    defaultValue={description}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    onChange={handleDescriptionChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                  >
                    Confirm
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
                <DropzoneArea
                  dropzoneClass="preview-box"
                  onChange={handleImageDropZone}
                  onDelete={handleImageDropZone}
                  acceptedFiles={[
                    'image/jpeg',
                    'image/png',
                    'image/bmp',
                    'image/jpg',
                  ]}
                  maxFileSize={5000000}
                  initialFiles={currItem.photos}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
}

export default EditItem;
