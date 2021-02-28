import React, { useState } from 'react'

import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/logo.png'
import makeStyles from './style'
import { Link, useLocation } from 'react-router-dom'
import Search from './Search/Search'
import Account from './Account/Account'
import Gender from './Gender/Gender'
const Navbar = (props) => {
    const classes = makeStyles()
    const location = useLocation()
    const [women, setWomen] = useState(false)
    const [men, setMen] = useState(true)
    const [showDrop, setShowDrop] = useState(false)

    const handleGenderSwap = (gender) => {
        if (gender === 'women'){
            setWomen(previous => previous = !previous)
            setMen(previous => previous = !previous)

        }
        else if (gender === 'men'){
            setMen(previous => previous = !previous)
            setWomen(previous => previous = !previous)

        }
    }

    //show dropdown meu for the account
    const handleShowDropdown = () => {
        setShowDrop(previous => previous = !previous)
    }

    return (
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                    <img src={logo} alt="Milevia" height="80px" className={classes.image} />
                    Milevia
                </Typography>
                <Gender activeWomen={women} activeMen={men} switchGender={handleGenderSwap}/>
                <div className={classes.grow}/>
                <Search />
                <Account show={showDrop} showDrop={handleShowDropdown}/>
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
