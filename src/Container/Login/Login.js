import React from 'react';
import './Login.css';
import IconButton from '@material-ui/core/IconButton';
import { auth, googleProvider, db } from '../../firebase';
import { getUserDetails, getAllUsers } from '../../store/actions/userActions';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';

function Login() {
    const dispatch = useDispatch();
    
    const clickHandler = async () => {
        await auth.signInWithPopup(googleProvider)
        .then(({ user }) => {
            db.collection('users').doc(user.uid).set({
                name: user.displayName,
                photoURL: user.photoURL,
                isOnline: true,
                email: user.email,
                time: firebase.firestore.FieldValue.serverTimestamp(),
                uid: user.uid
            })
            return user;
        })
        .then((user) => {
            dispatch(getUserDetails({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid
            }))
        })
        .then(() => {
            db.collection("users")
            .onSnapshot((querySnapshot) => {
                let users = [];
                querySnapshot.forEach(doc => users.push(doc.data()));
                dispatch(getAllUsers(users))
            })
        })
        .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <div className="login_btn">
                <IconButton onClick={clickHandler}>
                    <span className='text'>sign in with</span>
                    <img src={process.env.PUBLIC_URL + 'google.png'} alt="google icon" />
                </IconButton>
            </div>
        </div>
    )
}

export default Login
