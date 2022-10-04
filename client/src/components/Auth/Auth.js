import React, { useState, useEffect } from 'react';
import { gapi } from "gapi-script";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin, GoogleLogout } from "react-google-login"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  }

  // GOOGLE AUTH LOGIN NEW SYSTEM
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '606386714869-rtbqmhcq4had0hkh0ih7erfo87kiug9j.apps.googleusercontent.com',
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);


const googleSuccess = async (res) => {
  const result = res?.profileObj;
  const token = res?.tokenId
  try {
    dispatch({type: 'AUTH', data: {result, token }});
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

const googleFailure = (error) => {
  console.log(error);
  console.log("Could not sign into Google. Please Check errors.");
};

// OLD CODE BELOW

// const googleSuccess = async (res) => {
//   const result = res?.profile.Obj;
//   const token = res?.tokenId
//   try {
//     dispatch({type: 'AUTH', data: {result, token }});
//     navigate('/');
//   } catch (error) {
//     console.log(error);
//   }
// }
// const googleFailure = (error) => {
//   console.log(error);
//   console.log("Google Sign In was unsuccessful. Try again.")
// }

// clear cache if error continues.
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autofocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
              {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId='606386714869-rtbqmhcq4had0hkh0ih7erfo87kiug9j.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
              className={classes.googleButton} color="primary"
              fullWidth
              onClick={renderProps.onClick}
              disabled={renderProps.disabled} startIcon={<Icon />}
              variant="contained"
              >Google Sign In</Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button
              onClick={switchMode}
              >{ isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up!"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
