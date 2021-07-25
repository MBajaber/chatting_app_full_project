import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase';
import './User.css';

function User({ image, isOnline, name, clicked, id }) {

    const [text, setText] = useState('');
    const [counter, setCounter] = useState(0);
    const myId = useSelector(state => state.user.user.uid);

    const cutText = () => name.length > 16 ? `${name.slice(0, 16)}...`: name;
    const longText = () => text && text.length > 0 && text[text.length - 1].length > 20 ? `${text[text.length - 1].slice(0, 20)}...`: text[text.length - 1];
    const dotClass = ['dot', isOnline ? 'on' : 'off'];

    useEffect(() => {
        const unsubscribe = db.collection('chat')
        .where('id_1', 'in', [myId, id])
        .orderBy('timeStamp', 'asc')
        .onSnapshot((querySnapshot) => {
            let allConversations = [];
            querySnapshot.forEach(doc => {
                if(
                    (myId === doc.data().id_1 || myId === doc.data().id_2) 
                    &&
                    (id === doc.data().id_1 || id === doc.data().id_2) 
                ) {
                    allConversations.push(doc.data().message);
                }
            })
            setText(allConversations);
        })
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const subscribe = db.collection('chat')
        .where('id_2', 'in', [myId])
        .onSnapshot((querySnapshot) => {
            let getAllNotSeenMsg = [];
            querySnapshot.forEach(doc => {
                if(myId === doc.data().id_2 && id === doc.data().id_1 && doc.data().isSeen === false) {
                    getAllNotSeenMsg.push(false);
                }
            })
            setCounter(getAllNotSeenMsg.length);
        })
        return () => subscribe();
    }, []);

    return (
        <div className='user' onClick={() => clicked({id, name, image})} >
            <div className="image">
                <img src={image} alt={name} loading='lazy' />
                <span className={dotClass.join(' ')}></span>
            </div>
            <div className="text" title={cutText()}>
                <div className="header_count">
                    <h6><bdi>{cutText()}</bdi></h6>
                    {counter > 0 && <div className="msg_counter">{counter}</div>}
                </div>
                <p>{longText()}</p>
            </div>
        </div>
    )
}

export default User
