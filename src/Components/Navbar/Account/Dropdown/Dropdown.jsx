import React from 'react'
import classes from './Dropdown.css'
import user from '../../../../assets/user.svg'
import shoppingCart from '../../../../assets/shopping-cart.svg'
import CustomLink from '../../../CustomLink/CustomLink'

const Dropdown = props => {
    const integratedClasses = [classes.Dropdown]
  
    if (props.show) integratedClasses.push(classes.show)
    return (
        <div className={integratedClasses.join(' ')}>
            <div className={classes.Access}>
                <h3><a>Sign in</a></h3>
                <h3 ><a>Join</a></h3>
                <h2>X</h2>
            </div>
            <ul className={classes.Options}>
                <CustomLink tag="div" to="/signup">
                    <img src={user} alt="user"/>
                    <h3>My account</h3>
                </CustomLink>
                <div>
                    <img src={shoppingCart} alt="shopping cart"/>
                    <h3>My orders</h3>

                </div>

            </ul>
        </div>
    )

}
export default Dropdown