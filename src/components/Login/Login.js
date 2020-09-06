import React from "react";
import { provider } from "../../services/firebase";
import { useSelector, useDispatch } from "react-redux";
import { login, selectUser } from "../../features/user/userSlice";
import { Redirect, Link } from "react-router-dom";
import * as firebase from "firebase";
import { LogoWrapper, LogoHeader, LogoImage, LogoButton } from "./login.style";
function Login() {
  const users = useSelector(selectUser);
  const dispatch = useDispatch();

  const googleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          login({
            email: user.email,
            displayName: user.displayName,
            photo: user.photoURL,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <LogoWrapper>
        <LogoImage />
        <LogoHeader>Log in to our Chatter</LogoHeader>
        <LogoButton onClick={googleLogin}>
          Log in with Google
          {users ? <Redirect to='/rooms' /> : null}
        </LogoButton>
      </LogoWrapper>
      <Link to='/policy'>Privacy Policy</Link>
    </>
  );
}

export default Login;
