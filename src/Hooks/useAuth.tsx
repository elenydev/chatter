import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../features/user/userSlice";
import { auth } from "../services/firebase";

export const useAuth = (): User => {
  const dispatch = useDispatch();
  const currentUser: User | null = useSelector(selectUser);

  useEffect(() => {
    const setUser = (user: User) => {
      const { uid, email, displayName, photoURL } = user;
      if (user) {
        dispatch(
          login({
            uid,
            email,
            displayName,
            photoURL,
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
