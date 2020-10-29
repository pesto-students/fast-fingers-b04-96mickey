import React from 'react';
import './App.css';
import { Home, Main } from './components';
import { cacheDictionaryData } from './helper';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      difficulty: "Easy",
      ongoingGameStatus: false,
      score: [],
      valid: true
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value.trim() }, () => {
      if(this.state.name.trim()) {
        this.setState({valid: true})
      }
    });
  };

  toggleGameStatusChange = () => {
    // handle validations before switching the state
    if(!this.state.name.trim() && !this.state.ongoingGameStatus) {
      this.setState({valid: false});
      return;
    }
    const stateToUpdate = {};
    if(this.state.ongoingGameStatus) {
      stateToUpdate.name = ""
    }
    stateToUpdate.ongoingGameStatus = !this.state.ongoingGameStatus;
    this.setState(stateToUpdate);
  }

  updateScore = (newScore) => {
    const score = [...this.state.score];
    score.push(newScore);
    this.setState({score});
  }

  componentDidMount = async () => {
    await cacheDictionaryData();
  }

  render() {
    const { ongoingGameStatus, name, difficulty, score, valid } = this.state;
      return (
      <div className="App">
          <img src="./images/group243.svg" className="app-background" alt="backdrop" />
          <div>
            {
              ongoingGameStatus ? 
              <Main
                toggleGameStatusChange={this.toggleGameStatusChange} 
                name={name}
                difficulty={difficulty}
                prevScores={score}
                updateScore={this.updateScore}
              /> : 
              <Home 
                toggleGameStatusChange={this.toggleGameStatusChange} 
                handleChange={this.handleChange} 
                valid={valid}
              />
            }
          </div>
      </div>
    );
  }
}

export default App;
