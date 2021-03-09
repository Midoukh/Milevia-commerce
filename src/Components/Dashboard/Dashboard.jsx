import React, { useState, useEffect } from 'react'
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
import axios from 'axios'
import Mapp from './Map/Map'
import BGDashboard from '../../assets/bg-dashboard.jpg'


class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            error: '',
            userName: '',
            userRole: localStorage.getItem('milevia_role'),
            uploadAvatar: false,
            picture: '',
            avatarUpdated: false,
            flag: '',
            latlng: []
        }
    }

    componentWillMount(){
        //get the token stored in the local storage
        console.log('component will mount')
        console.log(this.props.userLocation)
        const latlng = this.props.userLocation.data[0].latlng
        this.setState({ latlng: latlng })

        const token = localStorage.getItem('milevia_user_token')
                
        if(token){
            const parseJwt = (token) =>{
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                const user = JSON.parse(window.atob(base64))
                
                //get the userName and the default avatar from the jwt
                this.setState({ userName: user.name })
                this.setState({ picture: user.profile.avatar })
                console.log('user\n', user)
            }
            parseJwt(token)

            axios.get('http://localhost:5000/api/user/login', {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    "Access-Control-Allow-Origin": "*"

                }
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }

    }
    handleChangeAvatar = () => {
        const newVal1 = !this.state.uploadAvatar
        const newVal2 = !this.state.avatarUpdated
  
        this.setState({ uploadAvatar: newVal1 })
        this.setState({ avatarUpdated: newVal2 })
    }
    imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            this.setState({ picture: reader.result})
          }
        }
        reader.readAsDataURL(e.target.files[0])
      };
    render(){

    return (
        <main className={classes.Dashboard}>
            {this.state.uploadAvatar && 
                <div className={classes.UploadAvatarCls}>
                    <img src={close}
                     alt="close"
                    className={classes.close}
                    onClick={this.handleChangeAvatar}
                    />
                        <div className={classes.container}>
                            <h1 className={classes.heading}>Add your Image</h1>
                                <div className={classes.imgHolder}>
                                    <img 
                                    src={this.state.picture} 
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
                                onChange={this.imageHandler}
                                />
                                <label htmlFor="input">
                                    <UploadFile />
                                </label>
                                <div className={classes.Buttons}>
                                    <button onClick={() => {
                                        this.setAvatarUpdated(prev => prev=true)
                                        this.handleChangeAvatar()
                                    }}>Upload</button>
                                    <button>Cancel</button>

                                </div>
                        </div>
                </div>
            }
            <aside>
                <div className={classes.Avatar}>
                    <img className={classes.Current} src={this.state.picture} alt="avatar"/>
                    <img className={classes.Add} src={add} alt="add" onClick={this.handleChangeAvatar}/>
                </div>
                <h2><strong>{this.state.userName}</strong></h2>
                <h3>A {this.state.userRole} Account</h3>
                <div className={classes.List}>
                    <ul>
                        <li><img src={home} alt="home"/><CustomLink to="/" tag="a">Home</CustomLink></li>
                        <li><img src={orders} alt="orders"/>Orders</li>
                        <li><img src={settings} alt="settings"/>Settings</li>
                        <li><i className="fas fa-sign-out-alt"></i> log Out</li>
                    </ul>
                </div>
            </aside>
            <section className={classes.Home}>
                <div className={classes.Welcome} style={{ backgroundImage:  `url(${BGDashboard})`}}>
                    <h2><span className={classes.active}>♥</span> Welcome home: <strong>{this.state.userName}</strong></h2>
                </div>
                <div className={classes.Map}>
                     <Mapp latlng={this.state.latlng}/> 
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


}
export default Dashboard