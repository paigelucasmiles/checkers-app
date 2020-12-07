function BlackTurn({turn}) {

    const displayTurn = () => {
        if(turn === "black"){
            return(
                <h2>BLACK</h2>
            )
        }
    }

    return(
        <div className="black-turn-container">
            {displayTurn()}
        </div>
    )
}

export default BlackTurn