import React from 'react'
import classes from './Gender.css'
const Gender = (props) => {
    
    return (
        <div className={classes.Gender}>
            <button 
            className={props.activeMen? classes.active: null}
            onClick={() => props.switchGender('men')}
            >Men</button>
            <button 
            className={props.activeWomen? classes.active: null}
            onClick={() => props.switchGender('women')}
            >Women</button>
        </div>
    )
}

export default Gender
