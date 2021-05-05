/* eslint-disable react/prop-types */
import React, { } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function UserDetails(props) {
  const { user, numListings } = props;
  console.log(user);

  return (
    <div id="user-details">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">{`${user.firstName} ${user.lastName}`}</Typography>
          <Typography variant="subtitle1">{user.school}</Typography>
          <Typography variant="subtitle1">{user.email}</Typography>
          <Typography variant="body2">{`${numListings} product(s) listed`}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserDetails;
