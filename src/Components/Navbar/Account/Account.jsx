import React from 'react'
import Icon from '@material-ui/core/Icon';
import classes from './Account.css'
import user from '../../../assets/user.svg'
import Dropdown from './Dropdown/Dropdown'
function Account(props) {
   const integratedClasses = [classes.Arrow]
   if (props.show) integratedClasses.push(classes.show)
    return  true? (
        <>
            <img 
            className={classes.Avatar} 
            src={user} 
            height="30px"
            onClick={props.showDrop}
            />
            <div className={integratedClasses.join(' ')}></div>
            <Dropdown show={props.show}/>
        
        </>
    ): null            
    
}

export default Account
