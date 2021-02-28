import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Products, Navbar, Cart, Checkout, SideMenu, Signup, Login, Dashboard } from '../Components'
import { commerce } from  '../lib/commerce'


const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const fetchProducts = async () => {
        const { data } = await commerce.products.list()

        setProducts(data)
    }
    const fetchCart = async () => {
        const resp = await commerce.cart.retrieve()
        setCart(resp)
    }
    //add items to the cart
    const handleAddToCart = async (productID, quantity) => {
        const res = await commerce.cart.add(productID, quantity)
        setCart(res.cart)
    }
    const handleUpdateCartQnt = async (productID, quantity) => {
        const res = await commerce.cart.update(productID, {quantity})
        setCart(res.cart)
    }
    const handleRemoveFromCart = async (productId) => {
        const res = await commerce.cart.remove(productId)
        setCart(res.cart)
    }
    const handleEmptyCart= async () => {
        const res = await commerce.cart.empty()
        setCart(res.cart)
    } 
    const refreshCart = async() => {
        const newCart = await commerce.cart.refresh()
        setCart(newCart)
    }
    const handleCaptureCheckout = async(checkoutTokenId, newOrder) => {
        try{
            const incomingOrder = await commerce.checkout(checkoutTokenId, newOrder)
            
            setOrder(incomingOrder)
            refreshCart()
        }catch(error){
            setErrorMessage(error.message)
        }
    }
    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])
    console.log(cart.line_items)
    return (
        <Router>
             <div>
                 <Route exact path="/">
                    <Navbar totalItems={cart.total_items}/>
                 </Route>
                
                <div style={{display: 'flex'}}>
                 <Route exact path="/">
                    <SideMenu />
                 </Route>
                    <Switch >
                  
                    <Route exact path="/">
                      <Products products={products} onAddToCart={handleAddToCart}/>
                    </Route>
                    
                    <Route exact path="/cart">
                     <Cart cart={cart} 
                     emptyCart={handleEmptyCart}
                     updateQnt={handleUpdateCartQnt}
                     removeItem={handleRemoveFromCart}
                     />
                    </Route>
                    <Route exact path="/checkout">
                     <Checkout 
                        cart={cart}
                        order={order}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={errorMessage}
                        refreshCart={refreshCart}
                        />
                    </Route>
                    <Route exact path="/signup">
                            <Signup />
                    </Route>

                    <Route exact path="/login">
                            <Login />
                    </Route>

                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>

                </Switch>

                </div>
                
             </div>
        </Router>
       
    )
}

export default App
