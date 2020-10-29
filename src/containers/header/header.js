import React from 'react';
import './header.css';

export const Header = React.memo((props) => {
    return (
        <div className="header">
            <div className="header-section">
                <span className="logo-with-desc">
                    <img className="logo" src="./images/icon-material-person.svg" alt="person" />
                    {props.name.toUpperCase()}
                </span>
                <span className="logo-with-desc">
                    <img className="logo" src="./images/icon-awesome-gamepad.svg" alt="gamepad" />
                    LEVEL: {props.difficulty.toUpperCase()}
                </span>
            </div>
            
            <div className="header-section">
                <p>fast fingers</p>
                <p>SCORE: {props.currentScore}</p>
            </div>
        </div>
    );
});
