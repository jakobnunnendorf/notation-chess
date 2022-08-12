import React, { Component } from 'react';
import './board.css';

export class Board extends Component {

    render() {

        const guidingRows =[] //Stores the row etiquettes
        for(let i=8; i>0; i--){
            guidingRows.push(<div className="square">{i}</div>)
        }

        const alphabet = ['A','B','C','D','E','F','G','H']
        const guidingCols=[]//Stores the column etiquettes
        for(let i=0; i<9; i++){
            guidingCols.push(<div className="square">{alphabet[i]}</div>)
        }

        let toggle_BLack_White = 3;
        const squares = [];
        for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                if((toggle_BLack_White%2)===0){
                    squares.push(<div className="dark square"></div>)
                } else if((toggle_BLack_White%2)===1){
                    squares.push(<div className="light square"></div>)
                }
                toggle_BLack_White++;
            }
            toggle_BLack_White++;
        }

        return (
            <div className='board-wrapper'>
                <div className='guiding-rows'>
                {guidingRows}
                </div>
                <div className="playing-field">
                    {squares}
                </div>
                <div className='guiding-cols'>
                    {guidingCols}
                </div>
            </div>
        )
    }
}

export default Board