import React, { Component } from "react";
import "./chess.css";

import Board from "./Components/Board/Board";
import Scoresheet from "./Components/Scoresheet/Scoresheet";
import UserInterface from "./Components/UserInterface/UserInterface";
export default class Chess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        pawns: {
          white: [
            [1, 7],
            [2, 7],
            [3, 7],
            [4, 7],
            [5, 7],
            [6, 7],
            [7, 7],
            [8, 7],
          ],
          black: [
            [1, 2],
            [2, 2],
            [3, 2],
            [4, 2],
            [5, 2],
            [6, 2],
            [7, 2],
            [8, 2],
          ],
        },
        rooks: {
          white: [
            [1, 8],
            [8, 8],
          ],
          black: [
            [1, 1],
            [8, 1],
          ],
        },
        knights: {
          white: [
            [2, 8],
            [7, 8],
          ],
          black: [
            [2, 1],
            [7, 1],
          ],
        },
        bishops: {
          white: [
            [3, 8],
            [6, 8],
          ],
          black: [
            [3, 1],
            [6, 1],
          ],
        },
        queens: {
          white: [[4, 8]],
          black: [[4, 1]],
        },
        kings: {
          white: [[5, 8]],
          black: [[5, 1]],
        },
      },
    };
    this.advancePawn = this.advancePawn.bind(this);
  }
  advancePawn(input) {
    let move = input.toLowerCase();
    console.log(move);
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let [x, y] = [files.indexOf(move[0]) + 1, parseInt(move[1])];
    console.log(x, y);
    if (move.length === 2) {
      for (let color in this.state.position.pawns) {
        console.log(color);
        console.log(
          this.state.position.pawns[color]
            .map(
              (pawn) =>
                (pawn[0] === x && pawn[1] === y - 1) ||
                (pawn[0] === x && pawn[1] === y + 1)
            )
            .indexOf(true)
        );
      }
    }
    // this.setState({
    //   position:{
    //   ...this.state.position,
    //   pawns: {
    //       ...this.state.position.pawns,
    //       white: [[1,7], [2,7], [3,7], [4,7], [5,7], [6,7], [7,7], [8,7]],
    //   },
    //   }});
  }
  render() {
    return (
      <div className="chess-app">
        <h1>Notation Chess</h1>
        <Board position={this.state.position} />
        <Scoresheet />
        <UserInterface advancePawn={this.advancePawn} />
      </div>
    );
  }
}
