import React, { lazy, Suspense, useEffect } from "react";
import Navbar from '../Components/Navbar/Navbar';
import { Switch, Route } from 'react-router-dom';
import { auth, db } from '../firebase';
import { getUserDetails, getAllUsers } from '../store/actions/userActions';
import { useDispatch } from 'react-redux';
import Loader from '../Components/Loader/Loader';
import { useSelector  } from 'react-redux';
import { Redirect } from "react-router-dom";
import firebase from 'firebase';

const LoginLazy = lazy(() => import('../Container/Login/Login'))
const MainLazy = lazy(() => import('../Container/Main/Main'))

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        db.collection('users').doc(user.uid).set({
          name: user.displayName,
          photoURL: user.photoURL,
          isOnline: true,
          email: user.email,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          uid: user.uid,
        }).then(() => {
          dispatch(getUserDetails({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }))
        }).then(() => {
          db.collection("users")
          .onSnapshot((querySnapshot) => {
            let users = [];
            querySnapshot.forEach(doc => users.push(doc.data()));
            dispatch(getAllUsers(users))
          })
        })
        .catch(error => alert(error.message));
      }
      return () => unsubscribe;
    });

  }, []);

  return (
    <div className="App">
      {user !== null ? <Redirect to='/main' /> : <Redirect to='/' />}
      <Navbar />
        <Suspense fallback={<Loader color='#1976d2' size={100} />}>
          <Switch>
            <Route path='/' component={LoginLazy} exact />
            <Route path='/main' component={MainLazy} />
          </Switch>
        </Suspense>
    </div>
  );
}

export default App;
