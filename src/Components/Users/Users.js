import React from 'react';
import './Users.css';
import User from './User/User';
import { useSelector, useDispatch } from 'react-redux';
import { startChat, openChat } from '../../store/actions/chatActions';

function Users() {
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.user.allUsers);
    const isThereUser = useSelector(state => state.user.user);
    const isScreenSmallSize = useSelector(state => state.chat.IsScreenSmallSize);
    const openChatValue = useSelector(state => state.chat.openChat)

    const clickedHandler = (id) => {
        dispatch(startChat(id));
        dispatch(openChat(true));
    }

    return (
        <div className='users' style={isScreenSmallSize ? openChatValue ? {flexShrink: '0', padding: '0', flexBasis: '0%' } : { flexShrink: '0', flexBasis: '100%' } : null } >
            {
                isThereUser && 
                allUsers.length > 0 
                ? allUsers.map(({ photoURL, isOnline, uid, name }) => <User key={uid} id={uid} image={photoURL} isOnline={isOnline} name={name} clicked={clickedHandler} />)
                : <div className='no_users'>No Users...</div>
            }
        </div>
    )
}

export default Users
