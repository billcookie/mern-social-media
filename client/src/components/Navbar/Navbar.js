import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from "./styles";
import logo from '../../images/logo.png'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';


const Navbar = () => {

  const classes = useStyles();


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: 'LOGOUT'});

    navigate('/');

    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
  //   // JWT...
    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <img className={classes.image} src={logo} alt="icon" height="60" />
        <Typography component = {Link} to= "/" className={classes.heading} variant="h2" align="center">Post It!</Typography>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
          )
          }
        </Toolbar>
      </AppBar>
    </div>

  )
}

export default Navbar
