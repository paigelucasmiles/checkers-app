import React, { Component } from 'react'
import Pawn from './Pawn'

class Square extends Component {

    state = {
        isMoveOption: true
    }
    
    renderRedPawns = () => {
        if(this.props.occupied === "white"){
            return <Pawn pawnColor="white" 
                currentLocation={this.props.coordinates}
                gameStage={this.props.gameStage}
                updateGameStage={this.props.updateGameStage}
                turn={this.props.turn}
                />
        } else {
            if(this.props.occupied === "black"){
                return <Pawn pawnColor="black" 
                currentLocation={this.props.coordinates}
                gameStage={this.props.gameStage}
                updateGameStage={this.props.updateGameStage}
                turn={this.props.turn}
                />
            }
        }
    }

    handleClick = (event) => {
        if(this.props.gameStage === "click square" && !this.props.occupied){
            this.props.updateGameStage(this.props)
        } else {
            return
        }
    }

    getClassName = (isHighlighted) => {
        if(isHighlighted){
            return("blue")
        } else {
            return(this.props.color)
        }
    }
    
    render(){
        const isHighlighted = this.props.legalMoves.includes(this.props.coordinates)
        return(
            <div className={this.getClassName(isHighlighted)} onClick={this.handleClick}>
                {this.renderRedPawns()}
            </div>
        )
    }
}

export default Square