import React from 'react';
import './Loader.css';

function Loader({ size }) {
    return (
        <div className="loader">
            <div className="sk-folding-cube" style={{width: size, height: size}}>
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
            </div>
        </div>
    )
}

export default Loader
