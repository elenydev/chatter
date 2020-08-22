import * as firebase from 'firebase';
import "firebase/auth";
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyD_sIyga9ta095JYa0W0nh-nuDpVc7rriA",
    authDomain: "chatter-9987a.firebaseapp.com",
    databaseURL: "https://chatter-9987a.firebaseio.com",
    projectId: "chatter-9987a",
    storageBucket: "chatter-9987a.appspot.com",
    messagingSenderId: "625867949007",
    appId: "1:625867949007:web:8c578df1d1be829134c8ba",
    measurementId: "G-5J33WWBJF3"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db  = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider}
export default db;