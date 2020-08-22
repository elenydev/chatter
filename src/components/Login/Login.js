import React from 'react'
import db, {auth, provider} from '../../services/firebase'
import * as firebase from 'firebase';
import {LogoWrapper, LogoHeader, LogoImage, LogoButton} from './LoginComps'
function Login() {

    const googleLogin = () =>{
        firebase.auth().signInWithPopup(provider).then((result) => {
            const user = result.user;
            console.log(user);
        })
        .catch(err =>{
            console.log(err);
        })
    }
    return (
        <LogoWrapper>
            <LogoImage/>
            <LogoHeader>
                Log in to our Chatter
            </LogoHeader>
            <LogoButton onClick={googleLogin}>
                Log in with Google
            </LogoButton>
        </LogoWrapper>
    )
}

export default Login
