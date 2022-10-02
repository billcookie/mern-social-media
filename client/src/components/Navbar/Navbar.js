import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from "./styles";
import memories from '../../images/memories.png'
import { useDispatch } from 'react-redux';


const Navbar = () => {

  const classes = useStyles();


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatchEvent({ type: 'LOGOUT'});

    navigate('/');

    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
  //   // JWT...

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);
  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography component = {Link} to= "/" className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
              <Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
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
