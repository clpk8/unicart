/* eslint-disable react/prop-types */
import React, { } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function UserDetails(props) {
  const { user, numListings } = props;
  const userObject = user();

  return (
    <div id="user-details">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">{`${userObject.firstName} ${userObject.lastName}`}</Typography>
          <Typography variant="subtitle1">{userObject.school}</Typography>
          <Typography variant="subtitle1">{userObject.email}</Typography>
          <Typography variant="subtitle1">
            {numListings.length === 0
              ? 'No Active Listings'
              : `${numListings} Current Listings`}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserDetails;
