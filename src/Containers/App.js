import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Products, Navbar, Cart, Checkout, SideMenu, Signup, Login, Dashboard } from '../Components'
import { commerce } from  '../lib/commerce'
import jwt_decode from 'jwt-decode';
import Footer from '../Components/Footer/Footer'
import axios from 'axios'


const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [expireToken, setExpiredToken] = useState(false)
    const [userLocation, setLocation] = useState(null)
    //protecting the dashboard route
    const login = () => {
        const token = localStorage.getItem('milevia_user_token')

        const decoded = jwt_decode(token);
 
        setAvatar(prev => prev = decoded.profile.avatar)
        //check if jwt is expired
        const expireToken = decoded.exp
        const isExpired = new Date() > expireToken*1000

        console.log(isExpired)

        setIsAuthenticated(prev => prev = !isExpired)


      

    }
    const handleFetchLocation = () => {

        axios.get(`http://www.geoplugin.net/json.gp`)
        .then(response => {
            let data = response.data;
            const countryName = data.geoplugin_countryName

            if (countryName){
                const getFlagByCountryCode = `
                https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`
                
                const res = axios.get(getFlagByCountryCode)
                .then(data => {
                    setLocation(prev => prev = data)
                    console.log(data)
                })
                .catch(err => console.log(err))
            }

        }).catch(error => {
            console.log(error);
        });


    }



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
        handleFetchLocation()
        fetchProducts()
        fetchCart()
        login()
    }, [])
    console.log(cart.line_items)
    return (
        <Router>
             <div>
                 <Route exact path="/">
                    <Navbar 
                    totalItems={cart.total_items} 
                    avatar={avatar}
                    isAuthenticated={isAuthenticated}
                    />
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
                            <Login setIsAuthenticated={setIsAuthenticated}/>
                    </Route>

                    <Route exact path="/dashboard" >
                        {isAuthenticated? <Dashboard userLocation={userLocation && userLocation}/>: <Redirect to="/login" />}
                    </Route>
                     

                </Switch>

                </div>
                    {userLocation && <Footer userLocation={ userLocation && userLocation }/>}
             </div>
        </Router>
       
    )
}

export default App
