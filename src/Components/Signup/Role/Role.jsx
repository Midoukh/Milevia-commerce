import React, { useRef, useState } from 'react'

import classes from './Role.css'
const Role = ({ setRole, handleSelectRole }) => {
    const[redirecting, setRedirecting] = useState(false)
    return(
            <div className={classes.Role}>
                <h3>I'm a </h3>
                <select name="role"
                
                onChange={(e) => {
                    setRole(prev => prev = e.target.value)
                }}
                className={classes.SelectStl}
                >
                    <option value="" selected disabled hidden>Choose</option>
                    <option value="client">Client</option>
                    <option value="seller">Seller</option>
                </select>
                <button onClick={() => {
                    setRedirecting(prev => prev = true)
                    setTimeout(() => {
                        setRedirecting(prev => prev = false)
                        handleSelectRole()
                    }, 1000)
                }}>{redirecting? <i className={["fas fa-spinner", classes.Spinner].join(' ')}></i>: "Continue"}</button>
            </div>
    
    )
}

export default Role