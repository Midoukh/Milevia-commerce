import React, { useRef, useState } from 'react'
import classes from './Login.css'
import logo from '../../assets/logo.png'
import { Link, useHistory } from 'react-router-dom'
import { accessUser } from '../../api/axios'
import CustomLink from '../CustomLink/CustomLink'

const Login = props => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const history = useHistory()
   
    const handleSubmit = async (e) => {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const loginUser = {
            email: email,
            password: password
        }
        e.preventDefault()
   
     
        try{
            console.log('sign in now')
            setError('')
            setLoading(prev => prev = true)
            await accessUser(loginUser)
            .then(res => {
                console.log(res)
                props.setIsAuthenticated(prev => prev = true)
                setLoading(prev => prev = false)
                localStorage.setItem('milevia_user_token', res.data.data.token)
                history.push('/dashboard')

            })
            .catch(err => {
                console.log(err, 'cant sign in')
                setError('Failed to log in')
                setLoading(prev => prev = false)
            })
            // setIsLogin(prev => prev = true)
            // localStorage.setItem('isLogin', isLogin)   
        }catch(error){
            console.log('failed to sign in')
       
        }
        setLoading(false)
    }
    const hideWarning = () => {
        setError(previous => previous = '')

    }
    return (

        <main style={{width: '100%', display: 'flex', justifyContent: 'center'}}>

        <main className={classes.Login}>
            <div>
                <img src={logo} alt="logo" datatype="logo"/>
                <h2>Log in</h2>
            </div>
            {error? (
                <div className={classes.Error}>
                   <h4>Failed to sign in <span onClick={hideWarning}>X</span></h4>
                </div>
            ): null}
            <br/>
            <br/>
            <form onSubmit={handleSubmit}>
                <label>Your email
                    <input type="text" placeholder="Your email..." ref={emailRef}/>

                </label>

                <label>Your password
                    <input type="password" placeholder="Your password..." ref={passwordRef}/>

                </label>

                <button type="submit" disabled={loading}>{loading? <i className={["fas fa-spinner", classes.Spinner].join(' ')}></i> : "Sign in"}</button>

            </form>

            <h5>You don't have an account? <CustomLink to="/signup" tag="a">Sign up</CustomLink> </h5>
            
        </main>
    </main>

    )
}

export default Login