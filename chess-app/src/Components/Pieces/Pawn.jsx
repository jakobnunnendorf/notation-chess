import React, { Component } from 'react'
import white_pawn from "../../media/white_pawn.png"
import black_pawn from "../../media/black_pawn.png"

export default class Pawn extends Component {
    constructor(props){
        super(props);
        this.state = {
            color: this.props.color,
            squarePos: this.props.squarePos,
            captured: false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            color: nextProps.color,
            squarePos: nextProps.squarePos,
        });
    }
    black_or_white = this.props.color === "white" ? white_pawn : black_pawn
  render() {
    const style={
        position: 'absolute',
        zIndex: "9999999",
        gridColumn: `${this.state.squarePos[0]}/${this.state.squarePos[0]}`,
        gridRow: `${this.state.squarePos[1]}/${this.state.squarePos[1]}`,
    }
    return (
        <div style={style}>
            <img src={this.black_or_white} alt="" className='piece'/>
        </div>
    )
  }
}
// gridColumn: `${this.state.position[0]}/${this.state.position[0]}`,