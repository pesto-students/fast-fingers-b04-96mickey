import React from 'react';
import './game-over.css';

export const GameOver = React.memo((props) => {
    return (
        <div className="game-container-wrapper game-over-conatiner">
            <p className="game-name">Score: {props.name}</p>
            <p id="current-score">{props.score}</p>
            {
                props.highScore ? (<p className="high-score-banner">New High Score</p>) : ''
            }
            <p onClick={props.restart} className="logo-with-desc clickable">
                <img className="logo" src="./images/icon-open-reload.svg" alt="person" /> 
                PLAY AGAIN
            </p>
        </div>
    );
});
