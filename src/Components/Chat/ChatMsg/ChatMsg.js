import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase';
import './ChatMsg.css';
import DoneAllIcon from '@material-ui/icons/DoneAll';


function ChatMsg({ text, fromUser, time, refSection, isSeen }) {
    const userId = useSelector(state => state.user.user && state.user.user.uid);
    const calcTime = () => time && `${time.toDate().getDate()}/${time.toDate().getMonth() + 1}/${time.toDate().getFullYear()} - ${time.toDate().toLocaleTimeString({}, { hour12: true, hour: 'numeric', minute: 'numeric' })}`;
    const { ref, inView } = useInView();
    const [isValid, setIsValid] = useState(isSeen);
    
    useEffect(() => {

        function unsubscribe() {
            inView && setIsValid(true);
            db.collection('chat')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if (
                        (userId === doc.data().id_2) &&
                        (doc.data().message === text) &&
                        (doc.data().isSeen === isSeen)
                    ) {
                        inView && doc.ref.update({ isSeen: true });
                    }
                });
            });
        }

        if (!isValid) {
            unsubscribe();
        }

        return () => unsubscribe;
    }, [inView]);

    return (
        <div ref={ref} className="chat_msg" style={fromUser ? { textAlign: 'right' } : { textAlign: 'left' }}>
            <div ref={refSection} className="msg" style={fromUser ? { borderRadius: '15px 0px 15px 15px', backgroundColor: '#dcf8c6' } : { borderRadius: '0px 15px 15px', backgroundColor: '#fff' }} >
                <div className="shap" style={fromUser ? { borderLeftColor: '#dcf8c6', right: '-17px' } : { borderRightColor: '#fff', left: '-17px' }} />
                <span className="text_msg">{text}</span>
                <div className="time">
                    <span className="show_time">{calcTime()}</span>
                    {fromUser && <span className="check_sign">{<DoneAllIcon style={ isSeen ? {color: '#4fc3f7'} : {color: '#9AAD8A'}} />}</span>}
                </div>
            </div>
        </div>
    )
}

export default ChatMsg;
