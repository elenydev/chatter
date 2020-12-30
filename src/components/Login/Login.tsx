import React from "react";
import { provider } from "../../services/firebase";
import { useSelector, useDispatch } from "react-redux";
import { login, selectUser } from "../../features/user/userSlice";
import { Redirect, Link } from "react-router-dom";
import firebase from "firebase";
import { LogoWrapper, LogoHeader, LogoImage, LogoButton } from "./login.style";

const Login = () => {
  const users = useSelector(selectUser);
  const dispatch = useDispatch();
  const googleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const { email, displayName, photoURL, uid } = user!;
        dispatch(
          login({
            email: email,
            displayName: displayName,
            photo: photoURL,
            uid: uid,
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
};

export default Login;
