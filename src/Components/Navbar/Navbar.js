import React from 'react';
import './Navbar.css';
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import { auth, db } from '../../firebase';
import { emptyUser } from '../../store/actions/userActions';
import { emptyAllUsers } from '../../store/actions/userActions';
import { resetChatSetting } from '../../store/actions/chatActions';

function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    
    const logout = () => {
        auth.signOut()
        .then(() => {
            db.collection('users').doc(user.uid).update({
                isOnline: false
            }).then(() => {
                dispatch(emptyUser());
                dispatch(emptyAllUsers());
                dispatch(resetChatSetting());
            })
        }).catch(error => alert(error.message))
    }

    return (
        <div className='navbar'>
            <Logo />
            { user !== null && <div className="name">{user.displayName}</div>}
            <div className="links">
                {
                    user !== null ? <button onClick={logout}>Logout</button> : <Link to='/'>Login</Link>
                }
            </div>
        </div>
    )
}

export default Navbar
