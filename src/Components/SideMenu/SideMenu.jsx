import React from 'react'
import Items from './Items/Items'
import DiscountBanner from './DiscountBanner/DiscountBanner'
import useStyles from './style'
function SideMenu() {
    const classes = useStyles
    return (
        <div style={classes.SideMenu}>
           <Items />
           <DiscountBanner />
        </div>
    )
}

export default SideMenu
