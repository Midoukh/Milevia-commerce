import React from 'react'
import classes from './FashionBG.css'
import fashion_1 from '../../../assets/fashion_1.jpg'

const FashioBG = () =>{
    return (
        <div className={classes.Fashion}>
            <div className={classes.Slogan}>
                <h1>The Retro Trend</h1>
            </div>
            <div className={classes.FashionLayer}></div>
            <img src={fashion_1}/>
        </div>
    )
}

export default FashioBG
