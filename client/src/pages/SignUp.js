import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  title: {
    textAlign: 'left',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    padding: '12vh 0 0 0',
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const registerInfo = useStoreState((state) => state.registerInfo);
  const setFirstName = useStoreActions((actions) => actions.setFirstName);
  const setLastName = useStoreActions((actions) => actions.setLastName);
  const setEmail = useStoreActions((actions) => actions.setEmail);
  const setPassword = useStoreActions((actions) => actions.setPassword);
  const setSchool = useStoreActions((actions) => actions.setSchool);

  function checkInfo() {
    // eslint-disable-next-line object-curly-newline
    const { firstName, lastName, email, password, school } = registerInfo;

    if (firstName === '' || lastName === '') {
      alert('Your name cannot be empty.');
      return false;
    }

    if (!email.endsWith('.edu')) {
      alert('Please register with your school email.');
      return false;
    }

    if (password === '') {
      alert('Please enter a password.');
      return false;
    }

    if (school === '') {
      alert('Please enter the school you currently go to.');
      return false;
    }
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (checkInfo()) {
      await fetch('/api/auth/register', {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(registerInfo),
      })
        .then((response) => {
          if (response.status === 200) {
            alert('You have successfully registered!');
            window.location.href = '/signin';
          }
          return response.text();
        })
        .then((message) => {
          alert(message);
        });
    }
  }

  return (
    <Grid container component="main" className={classes.root} data-testid="signup-test">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography className={classes.title} component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="firstName"
              label="First Name"
              id="firstName"
              autoFocus
              onChange={(event) => setFirstName(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              id="lastName"
              onChange={(event) => setLastName(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="school"
              label="School"
              id="school"
              onChange={(event) => setSchool(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
