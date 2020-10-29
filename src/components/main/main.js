import React from 'react';
import './main.css';
import { ScoreBoard, Header, GameOver } from '../../containers';
import { Game } from '..';
import { difficultyLevel, getRandomWordFromDictionary, gameStatus } from '../../helper';

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulty: "Easy",
            difficultyPoints: 1.0,
            gameName: "",
            sampleWord: "",
            answer: "",
            currentScore: 0,
            time: 0,
            status: gameStatus.ongoing,
            highScore: false
        }
    }

    onSuccessfulAnswer = (num) => { 
        //  set new word and time
        const newWord = this.generateNextWord(this.state.difficultyPoints + 0.01); 
        const allowedTime = this.timer(newWord, this.state.difficultyPoints + 0.01);
        this.setState({
            currentScore: this.state.currentScore + num,
            difficultyPoints: this.state.difficultyPoints + 0.01,
            answer: "",
            sampleWord: newWord,
            time: allowedTime
        });
    }

    onUnsuccessfulAnswer = () => {
        // set the data for current match to score board
        const { currentScore, gameName } = this.state;
        
        let highScore = true;
        this.props.prevScores.forEach(item => {
            highScore = highScore && currentScore > item.score;
        });
        this.props.updateScore({name: gameName, score: currentScore});

        // set game status as over and clear interval
        this.setState({
            status: gameStatus.over,
            highScore
        });
    }

    endGame = () => {
        this.setState({status: gameStatus.end}, () => {
            this.props.toggleGameStatusChange();
        });
    }

    restart = () => {
        const stateToUpdate = {};
        if (this.props.difficulty) {
            const passedDifficultyParams = difficultyLevel
                .find(item => item.name === this.props.difficulty);
            
            stateToUpdate.difficulty = passedDifficultyParams.name;
            stateToUpdate.difficultyPoints = passedDifficultyParams.minValue; 
        }

        const difficultyPoint = stateToUpdate.difficultyPoints || this.state.difficultyPoint;

        stateToUpdate.sampleWord = this.generateNextWord(difficultyPoint);
        // checking for number of games played before this and naming accordingly
        stateToUpdate.gameName = `Game ${this.props.prevScores.length + 1}`;
        stateToUpdate.prevScores = this.props.score;
        stateToUpdate.currentScore = 0;
        stateToUpdate.status = gameStatus.ongoing;
        stateToUpdate.time = this.timer(stateToUpdate.sampleWord, difficultyPoint);
        this.setState({...stateToUpdate});
    }

    generateNextWord = (difficultyPoints) => {
        const passedDifficultyParams = difficultyLevel
                .find(item => {
                    if(
                        (item.maxValue && 
                        item.maxValue >= difficultyPoints && 
                        item.minValue <= difficultyPoints) ||
                        (!item.maxValue && item.minValue <= difficultyPoints)
                        ) {
                            return true;
                    } 

                    return false
                });
        /**
         * We have data for minimum and maximum length of word
         * 
         * We can now query dictonary to get new word
         */
        const maxValue = passedDifficultyParams.maxCharacterLength || 20;
        const minValue = passedDifficultyParams.minCharacterLength;

        const lengthForWord = Math.floor(Math.random() * (maxValue - minValue) + minValue);

        return getRandomWordFromDictionary(lengthForWord);
    }

    timer = (word, difficultyPoints) => {
        let allowedTime = Math.ceil(word.length / difficultyPoints);

        if (allowedTime < 2 ) {
            allowedTime = 2;
        }

        return allowedTime;
    }

    componentDidMount = () => {
        this.restart();
    }

    render() {
        const { 
            currentScore, 
            difficulty, 
            sampleWord, 
            time, 
            status, 
            gameName, 
            highScore 
        } = this.state;
        return (
            <div className="game-wrapper">
                <Header 
                    name={this.props.name} 
                    difficulty={difficulty} 
                    currentScore={currentScore} 
                />
                <div className="game-section-wrapper">
                    <ScoreBoard 
                        scores={this.props.prevScores}
                    />
                    {
                        status === gameStatus.over ? (
                            <GameOver 
                                name={gameName}
                                score={currentScore}
                                highScore={highScore}
                                restart={this.restart}
                             />
                        ) : (
                            <Game 
                                onSuccessfulAnswer={this.onSuccessfulAnswer} 
                                sampleWord={sampleWord}
                                time={time}
                                status={status}
                                onUnsuccessfulAnswer={this.onUnsuccessfulAnswer}
                            />
                        )
                    }
                    <div className="empty"></div>
                </div>
                <div 
                    onClick={this.endGame} 
                    className="footer"
                >
                    STOP GAME
                </div>
            </div>
        )
    }
}