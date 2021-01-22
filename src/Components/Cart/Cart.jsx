import React from 'react'
import { Container, Button, Grid, Typography } from '@material-ui/core';
import makeStyles from './style'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'
const Cart = ({ cart, emptyCart, updateQnt, removeItem }) => {
    const classes = makeStyles()

    const EmptyCart = () => {
        return <Typography variant="subtitle1">
                    You have no items in your shopping cart!
                    <Link to="/" className={classes.link}>  Start adding some!!</Link>
                </Typography>
    }
    if (!cart.line_items) return 'Loading'
    // let isEmpty = !cart.line_items.length?true:false;

    const FilledCart = () => {
        return (
            <>
                <Grid container spacing={3}>
                    {cart.line_items.map((el) => {
                        return <Grid item xs={12} sm={4} key={el.id}>
                           <CartItem item={el} updateQnt={updateQnt} removeItem={removeItem}/>
                        </Grid>
                    })}
                    </Grid>
                <div className={classes.cardDetails}>
                    <Typography variant="h4">
                        Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={emptyCart}>Empty Cart</Button>
                        <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>

                    </div>
                </div>

            </>
        )
    }

    return (
        <Container>
           <div className={classes.toolbar}/>
           <Typography className={classes.title} variant="h3" >Your Shpping Cart</Typography>    
            {!cart.line_items.length? <EmptyCart/>: <FilledCart />}
        </Container>
    )


}
export default Cart