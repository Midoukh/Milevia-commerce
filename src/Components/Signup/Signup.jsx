import React, { useRef, useState, useEffect } from 'react'
import classes from './Signup.css'
import logo from '../../assets/logo.png'
import { Link, useHistory } from 'react-router-dom'
import { createUser } from '../../api/axios'
import signUpBG from '../../assets/sign-up-bg.jpg'
import avatar from '../../assets/user.svg'
import Role from './Role/Role'
import Auxi from '../HOC/Auxi'
import Backdrop from '../Backdrop/Backdrop'

const Login = ({  }) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const nameRef = useRef()
    const [error, setError] = useState('')
    const [matchError, setMatchError] = useState('')
    const history = useHistory()
    const[User, setNewUser] = useState({})
    const [loading, setLoading] = useState(false)
    const[role, setRole] = useState('')
    const[showRole, setShowRole] = useState(false)


    const hideWarning = () => {
        setMatchError(previous => previous = '')

    }
    let uiError =  <div className={classes.Error}>
                        <h4><span onClick={hideWarning}>X</span></h4>
                   </div>

    const handleSubmit = async (e) => {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        const name = nameRef.current.value
        const newUser = {
            name: name,
            email: email,
            password: password
        }
        setNewUser(prev => prev = newUser)

        e.preventDefault()
        if (password !== confirmPassword){
            setMatchError('Password doesn\'t match')
            uiError =  <div className={classes.Error}>
                        <h4>Password doesn't match<span onClick={hideWarning}>X</span></h4>
                   </div>
            return 
        }
        else{
            try{
                setLoading(prev => prev = true)
                console.log(newUser)
                await createUser(newUser)
                .then(res => {
                    localStorage.setItem('milevia_user_name', name)
                    console.log(res)
                    //promting the user for the role
                    setShowRole(true)
                })
                .catch(error => {
                    setMatchError('Cannot create an account')
                    console.log(matchError, 'cannot create an account')
                    setLoading(prev => prev = false)
                    uiError =  <div className={classes.Error}>
                        <h4>{error}<span onClick={hideWarning}>X</span></h4>
                    </div>
                })
            }catch(error){
                setError(prev => prev = error)
            }
        } 
    }
    const handleSelectRole = () => {
        //this function get called on a change in the role component
        if (role === 'client' || role === 'seller'){
            localStorage.setItem('milevia_role', role)
            console.log(role)
            history.push('/login')
        }
    }
    return (
        <main 
        style={{
            width: '100%', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: showRole && '100vh',
            overflow: showRole && 'hidden',
            backgroundImage: `url(${signUpBG})`
        }}>
       {showRole? 
        <>
            <Role setRole={setRole} handleSelectRole={handleSelectRole}/>
            <Backdrop />
        </>
        :
        <main className={classes.Signup}>
            <div>
                <img src={logo} alt="logo" datatype="logo"/>
                <h2>Create an account</h2>
            </div>
            {matchError? (
               uiError
            ): null}
            <br/>
            <br/>
            <div>
                {
                //add facebook and gmail auth
                }
            </div>
            <h4>---------------Or---------------</h4>
            <form onSubmit={handleSubmit}>
                <label>Your Full Name
                    <input type="text" placeholder="Your Full Name..." ref={nameRef} required/>

                </label>
                <label>Your email
                    <input type="text" placeholder="Your email..." ref={emailRef} required/>

                </label>

                <label>Your password
                    <input type="password" placeholder="Your password..." ref={passwordRef} required/>

                </label>
                <label>Confirm your password
                    <input type="password" placeholder="Confirm your password..." ref={confirmPasswordRef}/>

                </label>

                <button type="submit" disabled={loading}>{loading? <i className={["fas fa-spinner", classes.Spinner].join(' ')}></i> :'Sign up'}</button>

            </form>

            <h5>Already have an account? <Link to="login"><a href="">Sign in</a></Link> </h5>
            
        </main>}
    </main>

    )
}

export default Login
