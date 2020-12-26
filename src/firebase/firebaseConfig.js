import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBgOvkzFKWFtvSc58FWpBKBVMLCmEdwk7Y",
    authDomain: "reduxnotes-60dc5.firebaseapp.com",
    projectId: "reduxnotes-60dc5",
    storageBucket: "reduxnotes-60dc5.appspot.com",
    messagingSenderId: "171141657006",
    appId: "1:171141657006:web:275b2c8ec65ecc0371d83f"
  };

  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    googleAuthProvider,
    firebase
}