import React, { Component } from 'react';
import './App.css';

import Board from "./Components/Board"
import Turn from './Components/Turn';

class App extends Component {

  initialWhite = ["b1", "d1", "f1", "h1", 
  "a2", "c2", "e2", "g2",
  "b3", "d3", "f3", "h3"]

  initialBlack = ["a6", "c6", "e6", "g6",
  "b7", "d7", "f7", "h7",
  "a8", "c8", "e8", "g8"]
  
  gameStages = {
    "click square": "click piece",
    "click piece": "click square",
  }

  state = {
    turn: "white",
    stage: this.gameStages["click square"],
    white: this.initialWhite,
    black: this.initialBlack
  }

  updateGameStage = (current) => {
    const nextStage = this.gameStages[current.gameStage]
    this.setState({
      stage: nextStage
    })
    if(this.state.turn === "white"){
      this.updateWhite(current)
    }
    if(this.state.turn === "black"){
      this.updateBlack(current)
    }
  }

  updateWhite = (current) => {
    if(current.pawnColor){
      const newWhiteArray = this.state.white.filter(currentPosition => currentPosition !== current.currentLocation)
      this.setState({
        white: newWhiteArray
      })
    } if(current.coordinates){
      const newerWhiteArray = [...this.state.white, current.coordinates]
      this.setState({
        white: newerWhiteArray,
        stage: this.gameStages[current.gameStage],
        turn: "black"
      })
    }
  }

  updateBlack = (current) => {
    if(current.pawnColor){
      const newBlackArray = this.state.black.filter(currentPosition => currentPosition !== current.currentLocation)
      this.setState({
        black: newBlackArray
      })
    } if(current.coordinates){
      const newerBlackArray = [...this.state.black, current.coordinates]
      this.setState({
        black: newerBlackArray,
        stage: this.gameStages[current.gameStage],
        turn: "white"
      })
    }
  }

  render(){
    return (
      <div className="App">
        <Turn turn={this.state.turn}/>
        <Board turn={this.state.turn}
          gameStage={this.state.stage}
          updateGameStage={this.updateGameStage}
          white={this.state.white}
          black={this.state.black}
        />
      </div>
    );
  }
}

export default App;
