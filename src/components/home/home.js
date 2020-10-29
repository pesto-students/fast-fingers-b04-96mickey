import React from 'react';
import './home.css';
// need to improve relative paths
import { difficultyLevel } from '../../helper';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: true
        }
    }

    static getDerivedStateFromProps = (props, state) => {
        if(state.valid !== props.valid) {
            return {
                valid: props.valid
            };
        }
        return null;
    }

    handleOption(e) {
        e.preventDefault();
    }

    setDifficultyLevel() {
        return difficultyLevel.map(level => 
            {
                return <option key={level.name} value={level.name}>{level.name}</option>
            }
        );
    }

    render() {
        const { valid } = this.state;
        let inputClassName = valid ? 'form-control name-input' : 'form-control name-input invalid'
        const difficultyLevelOptions = this.setDifficultyLevel();
        return (
            <div className="container main-wrapper">
                <div className="about">
                    <img src="./images/icon-awesome-keyboard.svg" alt="logo" />
                    <div className="title-wrapper mb-5">
                        <span className="home-page-title">fast fingers</span>
                        <div className="separator sub-text">the ultimate typing game</div>
                    </div>
                    <div className="game-info-setup input-group-lg">
                        {!valid ? <span>Name is mandatory</span> : ''}
                        <input 
                            onChange={this.props.handleChange} 
                            name="name" 
                            type="text" 
                            className={inputClassName}
                            placeholder="TYPE YOUR NAME" 
                            aria-label="Username" 
                            aria-describedby="username" 
                            autoComplete="off"
                        />
                        <select 
                            onChange={this.props.handleChange} 
                            name="difficulty" 
                            className="difficulty-level-selection custom-select"
                        >
                            <option defaultValue disabled selected>DIFFICULTY LEVEL</option>
                            {difficultyLevelOptions}
                        </select>
                    </div>
                </div>
                <div className="logo-with-desc clickable">
                    <img src="./images/icon-awesome-play.svg" id="play-icon" alt="start" />
                    <span onClick={this.props.toggleGameStatusChange}>START GAME</span>
                </div>
            </div>
        )
    }
}