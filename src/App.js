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
    selectedPawnLocation: "",
    legalMoves: []
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
      this.showLegalMoves(current)
    } if(current.coordinates){
      const pawnColor = "white"
      this.legalMoves(current, pawnColor)
    }
  }

  updateBlack = (current) => {
    if(current.pawnColor){
      this.showLegalMoves(current)
    } if(current.coordinates){
      const pawnColor = "black"
      this.legalMoves(current, pawnColor)
    }
  }

  showLegalMoves = (current) => {
    const pawnLocation = current.currentLocation.split("")
    const currentColumn = pawnLocation[0]
    const currentRow = pawnLocation[1]

    const newColumnCode1 = currentColumn.charCodeAt(0) - 1
    const newColumnLetter1 = String.fromCharCode(newColumnCode1)

    const newColumnCode2 = currentColumn.charCodeAt(0) + 1
    const newColumnLetter2 = String.fromCharCode(newColumnCode2)

    if(current.pawnColor === "white"){
      const newRow = parseInt(currentRow) + 1
      const legalOption1 = newColumnLetter1.concat(newRow)
      const legalOption2 = newColumnLetter2.concat(newRow)
      let legalCoordinates = [legalOption1, legalOption2]
      const opponentToJump = legalCoordinates.filter(element => this.state.black.includes(element))
      
      console.log("Before opponents " + legalCoordinates)
      
      opponentToJump.forEach((element) => {
        let opponentColumn = element.split("")[0].charCodeAt(0)
        let offsetFromCurrent = opponentColumn - currentColumn.charCodeAt(0)

        let jumpedToColumn = currentColumn.charCodeAt(0) + (offsetFromCurrent * 2)
        let jumpedToRow = parseInt(currentRow) + 2
        let jumpedToCoord = String.fromCharCode(jumpedToColumn).concat(jumpedToRow)

        // remove from legalCoordinates the spot where the opponent is
        legalCoordinates = legalCoordinates.filter(otherElement => otherElement !== element)

        // add into legalCoordinates the "jumped to" space
        legalCoordinates.push(jumpedToCoord)
      })

      legalCoordinates = legalCoordinates.filter(element => this.state.black.includes(element) === false)

      console.log("After opponents: " + legalCoordinates)

      this.setState({
        legalMoves: legalCoordinates,
        selectedPawnLocation: current.currentLocation,
        stage: this.gameStages[current.gameStage]
      })
    } 
    
    
    if(current.pawnColor === "black"){
      const newRow = parseInt(currentRow) - 1
      const legalOption1 = newColumnLetter1.concat(newRow)
      const legalOption2 = newColumnLetter2.concat(newRow)
      let legalCoordinates = [legalOption1, legalOption2]
      const opponentToJump = legalCoordinates.filter(element => this.state.white.includes(element))
      
      console.log("Before opponents " + legalCoordinates)
      
      opponentToJump.forEach((element) => {
        let opponentColumn = element.split("")[0].charCodeAt(0)
        let offsetFromCurrent = opponentColumn - currentColumn.charCodeAt(0)

        let jumpedToColumn = currentColumn.charCodeAt(0) + (offsetFromCurrent * 2)
        let jumpedToRow = parseInt(currentRow) - 2
        let jumpedToCoord = String.fromCharCode(jumpedToColumn).concat(jumpedToRow)

        // remove from legalCoordinates the spot where the opponent is
        legalCoordinates = legalCoordinates.filter(otherElement => otherElement !== element)

        // add into legalCoordinates the "jumped to" space
        legalCoordinates.push(jumpedToCoord)
      })

      legalCoordinates = legalCoordinates.filter(element => this.state.white.includes(element) === false)


      console.log("After opponents: " + legalCoordinates)

      this.setState({
        legalMoves: legalCoordinates,
        selectedPawnLocation: current.currentLocation,
        stage: this.gameStages[current.gameStage]
      })
    }
  }


  legalMoves = (current, pawnColor) => {
    const currentLocation = this.state.selectedPawnLocation
    const currentColumn = currentLocation.split("")[0]
    const currentRow = currentLocation.split("")[1]

    const newColumnCode1 = currentColumn.charCodeAt(0) - 1
    const newColumnLetter1 = String.fromCharCode(newColumnCode1)

    const newColumnCode2 = currentColumn.charCodeAt(0) + 1
    const newColumnLetter2 = String.fromCharCode(newColumnCode2)

    if(pawnColor === "white"){
      const newRow = parseInt(currentRow) + 1
      const legalOption1 = newColumnLetter1.concat(newRow)
      const legalOption2 = newColumnLetter2.concat(newRow)
      let legalCoordinates = [legalOption1, legalOption2]
      const opponentToJump = legalCoordinates.filter(element => this.state.black.includes(element))
      if(legalCoordinates.includes(current.coordinates)){
        this.movePawn(current, pawnColor)
      } if(opponentToJump.includes(legalOption1)) {
        legalCoordinates = legalCoordinates.filter(element => element !== legalOption1)
        const jumpColumnCode = legalOption1.split("")[0].charCodeAt(0) - 1
        const jumpColumn = String.fromCharCode(jumpColumnCode)
        const jumpRow = parseInt(legalOption1.split("")[1]) + 1
        const jumpCoordinates = jumpColumn.concat(jumpRow)
        legalCoordinates = [...legalCoordinates, jumpCoordinates]
        if(legalCoordinates.includes(current.coordinates)){
          this.jumpPawn(current, pawnColor, legalOption1)
          console.log(legalOption1)
        }
      } if(opponentToJump.includes(legalOption2)) {
        legalCoordinates = legalCoordinates.filter(element => element !== legalOption2)
        const jumpColumnCode = legalOption2.split("")[0].charCodeAt(0) + 1
        const jumpColumn = String.fromCharCode(jumpColumnCode)
        const jumpRow = parseInt(legalOption1.split("")[1]) + 1
        const jumpCoordinates = jumpColumn.concat(jumpRow)
        legalCoordinates = [...legalCoordinates, jumpCoordinates]
        if(legalCoordinates.includes(current.coordinates)){
          this.jumpPawn(current, pawnColor, legalOption2)
          console.log(legalOption2)

        }
      }

    } if(pawnColor === "black"){
      const newRow = parseInt(currentRow) - 1
      const legalOption1 = newColumnLetter1.concat(newRow)
      const legalOption2 = newColumnLetter2.concat(newRow)
      let legalCoordinates = [legalOption1, legalOption2]
      const opponentToJump = legalCoordinates.filter(element => this.state.white.includes(element))
      if(legalCoordinates.includes(current.coordinates)){
        this.movePawn(current, pawnColor)
      } if(opponentToJump.includes(legalOption1)) {
        legalCoordinates = legalCoordinates.filter(element => element !== legalOption1)
        const jumpColumnCode = legalOption1.split("")[0].charCodeAt(0) - 1
        const jumpColumn = String.fromCharCode(jumpColumnCode)
        const jumpRow = parseInt(legalOption1.split("")[1]) - 1
        const jumpCoordinates = jumpColumn.concat(jumpRow)
        legalCoordinates = [...legalCoordinates, jumpCoordinates]
        if(legalCoordinates.includes(current.coordinates)){
          this.jumpPawn(current, pawnColor, legalOption1)
        }
      } if(opponentToJump.includes(legalOption2)) {
        legalCoordinates = legalCoordinates.filter(element => element !== legalOption2)
        const jumpColumnCode = legalOption2.split("")[0].charCodeAt(0) + 1
        const jumpColumn = String.fromCharCode(jumpColumnCode)
        const jumpRow = parseInt(legalOption1.split("")[1]) - 1
        const jumpCoordinates = jumpColumn.concat(jumpRow)
        legalCoordinates = [...legalCoordinates, jumpCoordinates]
        if(legalCoordinates.includes(current.coordinates)){
          this.jumpPawn(current, pawnColor, legalOption2)
        }
      }
    }
  }

  movePawn = (current, pawnColor) => {
    if(pawnColor === "white"){
      const newWhiteArray = this.state.white.filter(currentPosition => currentPosition !== this.state.selectedPawnLocation)
      this.setState({
        white: [...newWhiteArray, current.coordinates],
        turn: "black"
      })
    } if(pawnColor === "black"){
      const newBlackArray = this.state.black.filter(currentPosition => currentPosition !== this.state.selectedPawnLocation)
      this.setState({
        black: [...newBlackArray, current.coordinates],
        turn: "white"
      })
    }
  }

  jumpPawn = (current, pawnColor, opponentToJump) => {
    if(pawnColor === "white"){
      const newWhiteArray = this.state.white.filter(currentPosition => currentPosition !== this.state.selectedPawnLocation)
      const newBlackArray = this.state.black.filter(currentPosition => currentPosition !== opponentToJump)
      this.setState({
        black: [...newBlackArray],
        white: [...newWhiteArray, current.coordinates],
        turn: "black"
      })
    } if(pawnColor === "black"){
      const newBlackArray = this.state.black.filter(currentPosition => currentPosition !== this.state.selectedPawnLocation)
      const newWhiteArray = this.state.white.filter(currentPosition => currentPosition !== opponentToJump)
      this.setState({
        black: [...newBlackArray, current.coordinates],
        white: [...newWhiteArray],
        turn: "white"
      })
    }
  }


  render(){
    return (
      <div className="App">
        <WhiteTurn turn={this.state.turn} />
        <BlackTurn turn={this.state.turn}/>
        <Board turn={this.state.turn}
          gameStage={this.state.stage}
          updateGameStage={this.updateGameStage}
          white={this.state.white}
          black={this.state.black}
          legalMoves={this.state.legalMoves}
        />
      </div>
    );
  }
}

export default App;