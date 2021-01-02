interface Room {
  id: string;
  data: firebase.firestore.DocumentData;
}

interface User {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
}