import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBd_-tFL3K-4yue4Nq7oKTZhKyQq8IaRWw",
    authDomain: "chat-msg-a79b2.firebaseapp.com",
    projectId: "chat-msg-a79b2",
    storageBucket: "chat-msg-a79b2.appspot.com",
    messagingSenderId: "409282767250",
    appId: "1:409282767250:web:aa7b2da5f37420a721b94b"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, db, googleProvider }