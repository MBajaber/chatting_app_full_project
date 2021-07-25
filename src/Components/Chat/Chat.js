import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { useSelector, useDispatch } from 'react-redux';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import SendIcon from '@material-ui/icons/Send';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ChatMsg from './ChatMsg/ChatMsg';
import { db } from '../../firebase';
import { openChat, getAllMessages } from '../../store/actions/chatActions';
import firebase from 'firebase';

function Chat() {
    const chat = useSelector(state => state.chat);
    const userInfo = useSelector(state => state.user.user && state.user.user.uid);
    const isScreenSmallSize = useSelector(state => state.chat.IsScreenSmallSize);
    const openChatValue = useSelector(state => state.chat.openChat);
    const dispatch = useDispatch();
    const scrollElement = useRef();
    const [getUserTime, setgetUserTime] = useState('');
    const [isOnline, setIsOnline] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState('');

    useEffect(() => {
        const unsubscribe = db.collection("users")
            .where('uid', '==', chat.friendInfo.friendId)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setIsOnline(doc.data().isOnline);
                    doc.data().time && setgetUserTime(`${doc.data().time.toDate().getDate()}/${doc.data().time.toDate().getMonth() + 1}/${doc.data().time.toDate().getFullYear()} - ${doc.data().time.toDate().toLocaleTimeString({}, { hour12: true, hour: 'numeric', minute: 'numeric' })}`);
                });
            }, (error) => alert(error))
        scrollElement.current && scrollElement.current.scrollIntoView({ behavior: 'smooth' })
        return () => unsubscribe();
    }, [chat.friendInfo.friendId]);

    useEffect(() => {
        scrollElement.current && scrollElement.current.scrollIntoView({ behavior: 'smooth' });
    }, [chat.allMessages]);

    useEffect(() => {
        const subscribe = db.collection("chat")
            .where('id_1', 'in', [userInfo, chat.friendInfo.friendId])
            .orderBy('timeStamp', 'asc')
            .onSnapshot((querySnapshot) => {
                let allMessageFromServer = [];
                querySnapshot.forEach((doc) => {
                    if (
                        (chat.friendInfo.friendId === doc.data().id_1 || chat.friendInfo.friendId === doc.data().id_2)
                        &&
                        (userInfo === doc.data().id_1 || userInfo === doc.data().id_2)
                    ) {
                        allMessageFromServer.push({
                            message: doc.data().message,
                            id_1: doc.data().id_1,
                            time: doc.data().timeStamp,
                            isSeen: doc.data().isSeen
                        })
                    }
                });
                dispatch(getAllMessages(allMessageFromServer))
            }, (error) => alert(error))
        return () => subscribe();
    }, [chat.friendInfo.friendId]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (textAreaValue.trim()) {
            db.collection("chat")
                .add({
                    id_1: userInfo,
                    id_2: chat.friendInfo.friendId,
                    message: textAreaValue,
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                    isSeen: false
                })
                .catch((error) => alert(error.message))
            setTextAreaValue('');
        }
    }

    const changeHandler = (e) => setTextAreaValue(e);
    const backToUsers = () => isScreenSmallSize && dispatch(openChat(false));

    return (
        <div className='chat' style={isScreenSmallSize ? openChatValue ? { zIndex: '5', flexBasis: '100%', display: 'block' } : { zIndex: '1', flexBasis: '0%', display: 'none' } : {display: 'block'} }>
            {
                !chat.startChat && (
                    <div className="no_msg">
                        <div className="content">
                            <div className="no_msg_image">
                                <img src={process.env.PUBLIC_URL + 'start_msg.png'} alt="No Message" loading='lazy' />
                            </div>
                            <div className="txt">
                                Start Chatting Now
                            </div>
                        </div>
                    </div>
                )
            }
            {
                chat.startChat && (
                    <div className="message_section">
                        <div className="header">
                            <button className="left-arrow" onClick={backToUsers}>{<KeyboardBackspaceIcon />}</button>
                            <div className="user_info">
                                <div className="text">
                                    <h4>{chat.friendInfo.friendName}</h4>
                                    <span>{isOnline ? 'Online' : getUserTime}</span>
                                </div>
                                <div className='image'>
                                    <img src={chat.friendInfo.friendImage} alt={chat.friendInfo.friendName} loading='lazy' />
                                </div>
                            </div>
                        </div>
                        <div className="message_content" >
                            {
                                chat.allMessages.map(el => <ChatMsg key={el.id_1 + Math.random()} text={el.message} time={el.time} fromUser={el.id_1 === userInfo} refSection={scrollElement} isSeen={el.isSeen} />)
                            }
                        </div>
                        <div className="send_msg">
                            <form onSubmit={submitHandler}>
                                <div className="text-area">
                                    <TextareaAutosize aria-label="minimum height" minRows={1} maxRows={3} placeholder="Type a message" onChange={e => changeHandler(e.target.value)} value={textAreaValue} dir='auto' />
                                </div>
                                <button type="submit" className="send_btn btn">{<SendIcon />}</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Chat
