import { Component } from "react"

class Pawn extends Component {

    state = {
        clicked: false
    }

    handleClick = (event) => {
        if(this.props.gameStage === "click piece" && this.props.pawnColor === this.props.turn){
            this.props.updateGameStage(this.props)
            this.setState({
                clicked: true
            })
        } if(this.props.gameStage === "click square"){
            this.setState({
                clicked: false
            })
        }
    }

    render(){
        return(
            <div className={this.state.clicked ? "red" : this.props.pawnColor} onClick={this.handleClick}></div>
        )
    }
}

export default Pawn