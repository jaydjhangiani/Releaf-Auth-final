import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBAfZjkHAKZSFaSJTvsJxyTVDbWSTurPB8",
  authDomain: "releaf-chatroom.firebaseapp.com",
  databaseURL: "https://releaf-chatroom.firebaseio.com",
  projectId: "releaf-chatroom",
  storageBucket: "releaf-chatroom.appspot.com",
  messagingSenderId: "623133723362",
  appId: "1:623133723362:web:9c119b4d07cbeb6463ecbb",
  measurementId: "G-YSHQNW5NVS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
