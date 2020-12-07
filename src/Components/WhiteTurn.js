function WhiteTurn({turn}) {

    const displayTurn = () => {
        if(turn === "white"){
            return(
                <h2>WHITE</h2>
            )
        }
    }

    return(
        <div className="white-turn-container">
            {displayTurn()}
        </div>
    )
}

export default WhiteTurn