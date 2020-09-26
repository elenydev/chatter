import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../features/user/userSlice";
import { auth } from "../services/firebase";

export default () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    const setUser = (user) => {
      const { uid, email, displayName, photoURL } = user;
      if (user) {
        dispatch(
          login({
            uid: uid,
            email: email,
            displayName: displayName,
            photo: photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    };

    const unsubscribe = auth().onAuthStateChanged(setUser);

    return () => unsubscribe();
  }, [dispatch]);

  return currentUser;
};
