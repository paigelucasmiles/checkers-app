import { Component } from "react"

class Pawn extends Component {

    handleClick = (event) => {
        if(this.props.gameStage === "click piece" && this.props.pawnColor === this.props.turn){
            this.props.updateGameStage(this.props)
        } else {
            return
        }
    }

    render(){
        return(
            <div className={this.props.pawnColor} onClick={this.handleClick}></div>
        )
    }
}

export default Pawn