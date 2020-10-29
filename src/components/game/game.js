import React from 'react';
import './game.css';
import { Timer, Word } from '../../containers';
import { gameStatus } from '../../helper';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sampleWord: "",
            answer: "",
            time: 0,
            status: gameStatus.ongoing
        }
    }

    success = () => {
        this.setState({time: 0, answer: ""});
    }

    failure = () => {
        // trigger failure in parent component
        this.props.onUnsuccessfulAnswer();
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    successTimeForOngoingWord = (num) => {
        this.props.onSuccessfulAnswer(num);
    }

    static getDerivedStateFromProps = (props, state) => {
        if(state.sampleWord !== props.sampleWord || state.status !== props.status) {
            return {
                sampleWord: props.sampleWord,
                time: props.time, 
                status: props.status
            };
        }
        return null;
    }

    render() {
        const { answer, sampleWord, time, status } = this.state;
        return (
            <div className="game-container-wrapper">
                <Timer 
                    time={time} 
                    failure={this.failure} 
                    successTimeForOngoingWord={this.successTimeForOngoingWord} 
                    status={status}
                />
                <Word 
                    sampleWord={sampleWord} 
                    answer={answer} 
                    onSuccessfulAnswer={this.success} 
                />
                <div className="input-answer">
                    <input 
                        onChange={this.handleChange} 
                        value={answer}
                        name="answer" 
                        type="text" 
                        autoComplete="off" 
                        className="form-control name-input" 
                        aria-label="answer" 
                        aria-describedby="answer" 
                        autoFocus 
                    />
                </div>
            </div>
        );
    }
}
