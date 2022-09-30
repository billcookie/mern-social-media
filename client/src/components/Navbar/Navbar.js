import React from 'react'
import Link from 'react-router-dom';
import { AppBar, Typography } from '@material-ui/core';

const Navbar = () => {

  const classes = useStyles();

  const user = null;

  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>

    </div>

  )
}

export default Navbar
