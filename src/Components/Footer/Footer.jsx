import React, { useState, useEffect } from 'react'
import classes from './Footer.css' 
import axios from 'axios'
import Spinner from '../UI/Spinner/Spinner'
const Footer = (props)  => {
    const countryFlag = props.userLocation && props.userLocation.data[0].flag
    //get user country
  
  useEffect(() => {
    console.log(props.userLocation.data)

  }, [])
    return (
        <footer className={classes.Footer}>
            <div className={classes.Category}>
                <h4>Help and information</h4>
                <ul>
                    <li>Help</li>
                    <li>Track orders</li>
                    <li>Delivery & returns</li>

                </ul>
            </div>
            <div className={classes.Category}>
                <h4>About Milevia</h4>
                <ul>
                    <li>About us</li>

                </ul>
            </div>
            <div className={classes.Category}>
                <h4>About the Developer</h4>
                <ul>
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Github</li>


                </ul>
            </div>            <div className={classes.Category}>
                <h4>Shopping from</h4>
                <ul>
                    {props.userLocation && <li className={classes.Location}>You're in {countryFlag && <img className={classes.Flag} src={countryFlag}/>}</li>}
                </ul>
            </div>

        </footer>
    )
}

export default Footer
