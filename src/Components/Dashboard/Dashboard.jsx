import React, { useState } from 'react'
import classes from './Dashboard.css'
import logo from '../../assets/logo.png'
import { Link, useHistory } from 'react-router-dom'
import Logout from '../Logout/Logout'
import CustomLink from '../CustomLink/CustomLink'
import avatar from '../../assets/user.svg'
import add from '../../assets/add.svg'
import FileBase64 from 'react-file-base64';
import close from '../../assets/x-mark.svg'
import home from '../../assets/home.svg';
import orders from '../../assets/shopping-bag.svg';
import settings from '../../assets/settings.svg';
import Backdrop from '../Backdrop/Backdrop'
import UploadFile from '../UploadFile/UploadFile'



const Dashboard = (props) => {
  
    const[error, setError] = useState('')
    const history = useHistory()
    const[userName, setUSerName] = useState(localStorage.getItem('milevia_user_name'))
    const[userRole, setUSerRole] = useState(localStorage.getItem('milevia_role'))
    const[uploadAvatar, setUploadAvatar] = useState(false)
    const[picture, setPicture] = useState(avatar)
    const[avatarUpdated, setAvatarUpdated] = useState(false)

    //how to update the data of a certain user
 
    const handleLogout = async() => {
        try{
            // await logOut()
            history.push('/login')
        }
        catch{
            setError('Failed to Log Out')
        }
    }
    const handleChangeAvatar = () => {
        const newVal1 = !uploadAvatar
        const newVal2 = !avatarUpdated
  
        setUploadAvatar(prev => prev = newVal1)
        setAvatarUpdated(prev => prev = false)
    }
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            setPicture(prev => prev = reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
      };

    return (
        <main className={classes.Dashboard}>
            {uploadAvatar && 
                <div className={classes.UploadAvatarCls}>
                    <img src={close}
                     alt="close"
                    className={classes.close}
                    onClick={handleChangeAvatar}
                    />
                        <div className={classes.container}>
                            <h1 className={classes.heading}>Add your Image</h1>
                                <div className={classes.imgHolder}>
                                    <img 
                                    src={picture} 
                                    alt="image preview" 
                                    className={classes.img}
                                    />
                                </div>
                                <input 
                                className={classes.file} 
                                type="file" 
                                accept="image/*" 
                                name="image-upload" 
                                id="input"
                                onChange={imageHandler}
                                />
                                <label htmlFor="input">
                                    <UploadFile />
                                </label>
                                <div className={classes.Buttons}>
                                    <button onClick={() => {
                                        setAvatarUpdated(prev => prev=true)
                                        handleChangeAvatar()
                                    }}>Upload</button>
                                    <button>Cancel</button>

                                </div>
                        </div>
                </div>
            }
            <aside>
                <div className={classes.Avatar}>
                    <img className={classes.Current} src={!avatarUpdated? avatar: picture} alt="avatar"/>
                    <img className={classes.Add} src={add} alt="add" onClick={handleChangeAvatar}/>
                </div>
                <h2><strong>{userName}</strong></h2>
                <h3>A {userRole} Account</h3>
                <div className={classes.List}>
                    <ul>
                        <li><img src={home} alt="home"/> Home</li>
                        <li><img src={orders} alt="orders"/>Orders</li>
                        <li><img src={settings} alt="settings"/>Settings</li>
                        <li><i className="fas fa-sign-out-alt"></i> log Out</li>
                    </ul>
                </div>
            </aside>
            <section className={classes.Home}>
                <div className={classes.Welcome}>
                    <h2>Welcome home: <strong>{userName}</strong></h2>
                </div>
                <div className={classes.Map}>
                    Map
                </div>
                <div className={classes.Orders}>
                    <h2>My Orders</h2>
                    <ul className={classes.MyOrders}>
                        <li>
                            <h4>Order 1</h4>
                            <h4>Ordered at</h4>
                            <h4>Price: 100$</h4>
                        </li>
                        <li>
                            <h4>Order 2</h4>
                            <h4>Ordered at</h4>
                            <h4>Price: 100$</h4>
                        </li>
                        <li>
                            <h4>Order 3</h4>
                            <h4>Ordered at</h4>
                            <h4>Price: 100$</h4>
                        </li>
                    </ul>
                </div>

            </section>
        </main>
    )


}
export default Dashboard