import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

function Logo() {
    return (
        <div className="logo">
            <Link to='/'>
                <img src={process.env.PUBLIC_URL + `chat-icon.jpg`} alt="chat-logo" />
            </Link>
        </div>
    )
}

export default Logo
