import React, { Component } from 'react';
import './App.css';
import BlackTurn from './Components/BlackTurn';

import Board from "./Components/Board"
import WhiteTurn from './Components/WhiteTurn';

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
    black: this.initialBlack,
    selectedPawnLocation: ""
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

  legalWhiteMoves = (current) => { 
    const currentLocation = this.state.selectedPawnLocation
    const currentColumn = currentLocation.split("")[0]
    const currentRow = currentLocation.split("")[1]

    const newColumnCode1 = currentColumn.charCodeAt(0) - 1
    const newColumnLetter1 = String.fromCharCode(newColumnCode1)

    const newColumnCode2 = currentColumn.charCodeAt(0) + 1
    const newColumnLetter2 = String.fromCharCode(newColumnCode2)

    const newRow = parseInt(currentRow) + 1

    const legalOption1 = newColumnLetter1.concat(newRow)
    const legalOption2 = newColumnLetter2.concat(newRow)

    let legalCoordinates = [legalOption1, legalOption2]
    const match = legalCoordinates.find(element => this.state.black.includes(element))
    console.log(match)

    const nextMove = legalCoordinates.find(coordinate => coordinate === current.coordinates)

    const nextWhiteMove = (current) => {
      const newWhiteArray = this.state.white.filter(currentPosition => currentPosition !== this.state.selectedPawnLocation)
      this.setState({
        white: [...newWhiteArray, current.coordinates],
        turn: "black"
      })
    }

    const jump = (current, match) => {
      const currentLocation = match
      const currentColumn = currentLocation.split("")[0]
      const currentRow = currentLocation.split("")[1]

      const newColumnCode1 = currentColumn.charCodeAt(0) - 1
      const newColumnLetter1 = String.fromCharCode(newColumnCode1)

      const newColumnCode2 = currentColumn.charCodeAt(0) + 1
      const newColumnLetter2 = String.fromCharCode(newColumnCode2)

      const newRow = parseInt(currentRow) + 1

      const legalOption1 = newColumnLetter1.concat(newRow)
      const legalOption2 = newColumnLetter2.concat(newRow)

      let legalCoordinates = [legalOption1, legalOption2]
      const nextMove = legalCoordinates.find(coordinate => coordinate === current.coordinates)
      if(nextMove){
        const newWhiteArray = this.state.white.filter(currentPosition => currentPosition !== this.state.selectedPawnLocation)
        const newBlackArray = this.state.black.filter(currentPosition => currentPosition !== match)
      this.setState({
        black: [...newBlackArray],
        white: [...newWhiteArray, current.coordinates],
        turn: "white"
      })
      }
    }

    if(match){
      jump(current, match)
    }
    if(nextMove){
      nextWhiteMove(current)
    }
  }

  legalBlackMoves = (current) => { 
    const currentLocation = this.state.selectedPawnLocation
    const currentColumn = currentLocation.split("")[0]
    const currentRow = currentLocation.split("")[1]

    const newColumnCode1 = currentColumn.charCodeAt(0) - 1
    const newColumnLetter1 = String.fromCharCode(newColumnCode1)

    const newColumnCode2 = currentColumn.charCodeAt(0) + 1
    const newColumnLetter2 = String.fromCharCode(newColumnCode2)

    const newRow = parseInt(currentRow) - 1

    const legalOption1 = newColumnLetter1.concat(newRow)
    const legalOption2 = newColumnLetter2.concat(newRow)

    let legalCoordinates = [legalOption1, legalOption2]
    const match = legalCoordinates.find(element => this.state.white.includes(element))
    console.log(match)

    const nextMove = legalCoordinates.find(coordinate => coordinate === current.coordinates)

    const nextBlackMove = (current) => {
      const newBlackArray = this.state.black.filter(currentPosition => currentPosition !== this.state.selectedPawnLocation)
      this.setState({
        black: [...newBlackArray, current.coordinates],
        turn: "white"
      })
    }

    const jump = (current, match) => {
      const currentLocation = match
      const currentColumn = currentLocation.split("")[0]
      const currentRow = currentLocation.split("")[1]

      const newColumnCode1 = currentColumn.charCodeAt(0) - 1
      const newColumnLetter1 = String.fromCharCode(newColumnCode1)

      const newColumnCode2 = currentColumn.charCodeAt(0) + 1
      const newColumnLetter2 = String.fromCharCode(newColumnCode2)

      const newRow = parseInt(currentRow) - 1

      const legalOption1 = newColumnLetter1.concat(newRow)
      const legalOption2 = newColumnLetter2.concat(newRow)

      let legalCoordinates = [legalOption1, legalOption2]
      const nextMove = legalCoordinates.find(coordinate => coordinate === current.coordinates)
      if(nextMove){
        const newBlackArray = this.state.black.filter(currentPosition => currentPosition !== this.state.selectedPawnLocation)
        const newWhiteArray = this.state.white.filter(currentPosition => currentPosition !== match)
      this.setState({
        white: [...newWhiteArray],
        black: [...newBlackArray, current.coordinates],
        turn: "white"
      })
      }
    }

    if(match){
      jump(current, match)
    }
    if(nextMove){
      nextBlackMove(current)
    }
  }

  updateWhite = (current) => {
    if(current.pawnColor){
      this.setState({
        selectedPawnLocation: current.currentLocation,
        stage: this.gameStages[current.gameStage]
      })
    } if(current.coordinates){
      this.legalWhiteMoves(current)
    }
  }

  updateBlack = (current) => {
    if(current.pawnColor){
      this.setState({
        selectedPawnLocation: current.currentLocation,
        stage: this.gameStages[current.gameStage]
      })
    } if(current.coordinates){
      this.legalBlackMoves(current)
    }
  }

  render(){
    return (
      <div className="App">
        <WhiteTurn turn={this.state.turn} />
        <Board turn={this.state.turn}
          gameStage={this.state.stage}
          updateGameStage={this.updateGameStage}
          white={this.state.white}
          black={this.state.black}
        />
        <BlackTurn turn={this.state.turn}/>
      </div>
    );
  }
}

export default App;