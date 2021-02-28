import React from 'react'
import upload from '../../assets/cloud-computing.svg'
import classes from './UploadFile.css'

const UploadFile  = ({ style }) => {
    return (
        <div className={classes.UploadFile}>
            <img src={upload}/>
            <h1>Drop File Here</h1>
        </div>
    )
}

export default UploadFile