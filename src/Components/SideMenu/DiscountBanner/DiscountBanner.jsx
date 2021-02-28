import React from 'react'
import classes from './DiscountBanner.css'
function DiscountBanner() {
    return (
        <div className={classes.Banner}>
            <p>INVITE A FRIEND AND GET A DISOUNT <span className={classes.Percentage}>%5</span></p>
        </div>
    )
}

export default DiscountBanner
