import React from 'react'
import Items from './Items/Items'
import useStyles from './style'
function SideMenu() {
    const classes = useStyles
    return (
        <div style={classes.SideMenu}>
           <Items />
        </div>
    )
}

export default SideMenu
