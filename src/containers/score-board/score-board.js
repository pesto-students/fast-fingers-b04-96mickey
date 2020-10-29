import React from 'react';
import './score-board.css';

export const ScoreBoard = React.memo((props) => {
    const scoresForDisplay = scoreLayout(props.scores);
    return (
        <div className="score-board">
            <div className="score-board-header">SCORE BOARD</div>
            {scoresForDisplay}
        </div>
    );
});

function scoreLayout(scores) {
    let maxValue = 0;
    let maxIndex = 0;
    scores.forEach((score, index) => {
        if(score.score > maxValue) {
            maxIndex = index
            maxValue = score.score;
        }
    });
    return scores.map((score, index) => {   
        if(maxIndex === index) {
            return (
                <div key={index} className="score-with-sup-text">
                <div className="sup-text">PERSONAL BEST</div>
                <div className="individual-score" key={index} >{score.name} : {score.score}</div>
                </div>
            )
        }
        return (<div key={index} className="individual-score">{score.name} : {score.score}</div>)
    });
}
