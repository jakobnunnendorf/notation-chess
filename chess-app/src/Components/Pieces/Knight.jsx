import React, { Component } from 'react'
import white_knight from "../../media/white_knight.png"
import black_knight from "../../media/black_knight.png"

export default class Knight extends Component {
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
    black_or_white = this.props.color === "white" ? white_knight : black_knight
  render() {
    return (
        <div style={this.style}>
            <img src={this.black_or_white} alt="" className='piece'/>
        </div>
    )
  }
}
// gridColumn: `${this.state.position[0]}/${this.state.position[0]}`,