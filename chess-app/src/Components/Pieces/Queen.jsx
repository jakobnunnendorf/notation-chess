import React, { Component } from 'react'
import white_queen from "../../media/white_queen.png"
import black_queen from "../../media/black_queen.png"

export default class Queen extends Component {
    constructor(props){
        super(props);
        this.state = {
            color: this.props.color,
            position: this.props.squarePos,
            captured: false
        }
    }
    style={
        position: 'absolute',
        zIndex: "9999999",
        gridColumn: `${this.props.squarePos[0]}/${this.props.squarePos[0]}`,
        gridRow: `${this.props.squarePos[1]}/${this.props.squarePos[1]}`,
    }
    black_or_white = this.props.color === "white" ? white_queen : black_queen
  render() {
    return (
        <div style={this.style}>
            <img src={this.black_or_white} alt="" className='piece'/>
        </div>
    )
  }
}
// gridColumn: `${this.state.position[0]}/${this.state.position[0]}`,