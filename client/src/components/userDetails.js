/* eslint-disable react/prop-types */
import React, { } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function UserDetails(props) {
  const { user, numListings } = props;
  const userObject = user();
  console.log('userObject:', userObject);

  return (
    <div id="user-details">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">{`${userObject.firstName} ${userObject.lastName}`}</Typography>
          <Typography variant="subtitle1">{userObject.school}</Typography>
          <Typography variant="subtitle1">{userObject.email}</Typography>
          <Typography variant="body2">{`${numListings} product(s) listed`}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserDetails;
