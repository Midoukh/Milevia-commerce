import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/logo.png'
import makeStyles from './style'
import { Link, useLocation } from 'react-router-dom'

const Navbar = (props) => {
    const classes = makeStyles()
    const location = useLocation()
    return (
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                    <img src={logo} alt="Milevia" height="80px" className={classes.image} />
                    Milevia
                </Typography>
                <div className={classes.grow}/>
                {location.pathname === '/'&& (
                <div className={classes.button}>
                    <IconButton aria-label="show cart items" color="inherit" component={Link} to="/cart">
                        <Badge badgeContent={props.totalItems} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>)}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
