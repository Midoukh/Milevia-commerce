import React from 'react'
import useStyles from './style'
import { Typography } from '@material-ui/core';
import trending from '../../../assets/trending.svg'
import briefcase from '../../../assets/briefcase.svg'
import highHeel from '../../../assets/high-heel.svg'
import ring from '../../../assets/ring.svg'
import shirt from '../../../assets/shirt.svg'


function Items() {
    const classes = useStyles
  
    const items = [
        ['New in', trending],
        ['Clothing', shirt],
        ['Shoes', highHeel],
        ['Accessories', ring],
        ['Outlet', briefcase]
    ]
    return (
        <>
        <ul style={classes.Items}>
            { items.map((item, i) => {
                return (
                    <li style={classes.item} key={item[0]+i}>
                        <div style={classes.Icon}><img src={item[1]} height="20px"/></div>
                        {console.log(item[1])}
                        <Typography style={classes.Text} variant="subtitle1">{item[0]}</Typography>
                    </li>
                )
            }) }
        </ul>
        </>
    )
}

export default Items
