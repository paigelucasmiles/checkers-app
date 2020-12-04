function Turn(props){

    return(
        <div className="turn-container">
            <h1 className="turn">
                {`Turn: ${props.turn}`}
            </h1>
        </div>
    )
}

export default Turn