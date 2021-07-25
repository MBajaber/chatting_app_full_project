import React, { useEffect, useState } from 'react';
import Chat from '../../Components/Chat/Chat';
import Users from '../../Components/Users/Users';
import './Main.css';
import { isScreenSmallSize } from '../../store/actions/chatActions'
import { useDispatch, useSelector } from 'react-redux';

function Main() {

    const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const dispatch = useDispatch();
    const isSmallScreen = useSelector(state => state.chat.IsScreenSmallSize);

    let [width, setWidth] = useState(getWidth());
    useEffect(() => {
        let timeoutId = null;
        const resizeListener = () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => setWidth(getWidth() < 570), 1000);
        };
        window.addEventListener('resize', resizeListener);
        return () => {
          window.removeEventListener('resize', resizeListener);
        }
    }, [])

    useEffect(() => {
        dispatch(isScreenSmallSize(width));
    }, [width]);

    return (
        <div className='main' style={isSmallScreen ? { display: 'flex' } : null}>
            <Users />
            <Chat />
        </div>
    )
}

export default Main
