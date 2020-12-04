import React from 'react';
import Square from '../Components/Square'

function Board ({turn, gameStage, updateGameStage, white, black, movePawn}) {

    const renderPawns = (key) => {
        if(white.find(player => player === key)){
            return "white"
        } else {
            if (black.find(player => player === key)){
                return "black"
            }
        }
    }
    
    const renderSquares = () => {
        let gameSpaces = new Array(8)

        for (let i = 0; i < gameSpaces.length; i++){
            gameSpaces[i] = new Array(8)
        }

        for (let i = 0; i < gameSpaces.length; i++){
            const innerArrayLength = gameSpaces[i].length;
            for (let j = 0; j < innerArrayLength; j++){
                const color = (i + j) % 2 === 0 ? "beige" : "green"
                const columns = {
                    0: "a",
                    1: "b",
                    2: "c",
                    3: "d",
                    4: "e",
                    5: "f",
                    6: "g",
                    7: "h",
                }
                const rows = {
                    0: "1",
                    1: "2",
                    2: "3",
                    3: "4",
                    4: "5",
                    5: "6",
                    6: "7",
                    7: "8",
                }
                gameSpaces[i][j] = <Square 
                    key={`${i}${j}`}
                    coordinates={`${columns[j]}${rows[i]}`}
                    color={color}
                    occupied={renderPawns(`${columns[j]}${rows[i]}`)}
                    gameStage={gameStage}
                    updateGameStage={updateGameStage}
                    turn={turn}
                />
            }
        }
        return(gameSpaces)
    }
    
    return(
        <div className="board-container">
            {renderSquares()}
        </div>
    )
}

export default Board