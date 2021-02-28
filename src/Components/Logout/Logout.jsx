import React from 'react'
import Icon from '@material-ui/core/Icon';

const style = {
    Logout: {
        display: 'flex',
        opacity: '0.7',
        marginTop: '5vh',
        alignItems: 'center',
        cursor: 'pointer'       
    },
    LogoutTxt: {
        marginLeft: '1rem'
    }

}

const Logout = ({ login }) => {
    return (
        true? <div style={style.Logout}>
            <Icon className="fas fa-sign-out-alt"/>
            {/* <i className="fas fa-sign-out-alt"></i> */}
            <h3 style={style.LogoutTxt}>Log Out</h3>
        </div> : null
    )
}

export default Logout