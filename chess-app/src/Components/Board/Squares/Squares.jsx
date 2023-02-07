import React from 'react'
import Square from './Square';
import Pawn from '../../Pieces/Pawn';
import Rook from '../../Pieces/Rook';
import Knight from '../../Pieces/Knight';
import Bishop from '../../Pieces/Bishop';
import Queen from '../../Pieces/Queen';
import King from '../../Pieces/King';


export default function Squares(props) {

    // create the squares for the board
    let toggle_BLack_White = 0; // this is used to alternate the color of the squares
    const squares = []; // this will store the squares

    for(let i=8; i>=1; i--){ // loop through the rows
        for(let j=1; j<=8; j++){ // loop through the columns
            let color = toggle_BLack_White % 2 === 0 ? 'light' : 'dark';
            squares.push(<Square color={color} squarePos={[j,i]}/>)
            toggle_BLack_White++; // increment the number
            }
        toggle_BLack_White++; // alternate start color of each row
        }

    // add the pawns to the board
    const pawns = [];
    for(const color in props.position.pawns){ // loop through black and white
        for(const pawn in props.position.pawns[color]){ // loop through each pawn
            console.log(`color is ${color} and pawn is ${pawn}`)
            console.log(`so i push <Pawn color=${color} squarePos=${props.position.pawns[color][pawn]}/>`)
            pawns.push(<Pawn color={color} squarePos={props.position.pawns[color][pawn]}/>)
        }
    }
    const rooks = [];
    for(const color in props.position.rooks){ // loop through black and white
        for(const rook in props.position.rooks[color]){ // loop through each pawn
            console.log(`color is ${color} and rook is ${rook}`)
            console.log(`so i push <Rook color=${color} squarePos=${props.position.rooks[color][rook]}/>`)
            rooks.push(<Rook color={color} squarePos={props.position.rooks[color][rook]}/>)
        }
    }
    const knights = [];
    for(const color in props.position.knights){ // loop through black and white
        for(const knight in props.position.knights[color]){ // loop through each pawn
            console.log(`color is ${color} and knight is ${knight}`)
            console.log(`so i push <Knight color=${color} squarePos=${props.position.knights[color][knight]}/>`)
            knights.push(<Knight color={color} squarePos={props.position.knights[color][knight]}/>)
        }
    }
    const bishops = [];
    for(const color in props.position.bishops){ // loop through black and white
        for(const bishop in props.position.bishops[color]){ // loop through each pawn
            console.log(`color is ${color} and bishop is ${bishop}`)
            console.log(`so i push <Bishop color=${color} squarePos=${props.position.bishops[color][bishop]}/>`)
            bishops.push(<Bishop color={color} squarePos={props.position.bishops[color][bishop]}/>)
        }
    }
    const queens = [];
    for(const color in props.position.queens){ // loop through black and white
        for(const queen in props.position.queens[color]){ // loop through each pawn
            console.log(`color is ${color} and queen is ${queen}`)
            console.log(`so i push <Queen color=${color} squarePos=${props.position.queens[color][queen]}/>`)
            queens.push(<Queen color={color} squarePos={props.position.queens[color][queen]}/>)
        }
    }
    const kings = [];
    for(const color in props.position.kings){ // loop through black and white
        for(const king in props.position.kings[color]){ // loop through each pawn
            console.log(`color is ${color} and king is ${king}`)
            console.log(`so i push <King color=${color} squarePos=${props.position.kings[color][king]}/>`)
            kings.push(<King color={color} squarePos={props.position.kings[color][king]}/>)
        }
    }
  return (
    <div className="playing-field">
        {squares}
        {pawns}
        {rooks}
        {knights}
        {bishops}
        {queens}
        {kings}
    </div>
  )
}
