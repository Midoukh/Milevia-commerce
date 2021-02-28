import React from 'react'
import Items from './Items/Items'
import DiscountBanner from './DiscountBanner/DiscountBanner'
import useStyles from './style'
import Logout from '../Logout/Logout'
const classes = useStyles



function SideMenu(props) {
    const isLogin = localStorage.getItem('isLogin')

    console.log(isLogin)

    return (
        <div style={classes.SideMenu}>
           <Items />
           <DiscountBanner />
           {isLogin && <Logout />}
        </div>
    )
}


export default SideMenu
