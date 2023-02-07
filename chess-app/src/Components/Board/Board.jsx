import React, { Component } from 'react';
import Squares from './Squares/Squares';
import './board.css';
import GuidingRows from './GuidingRows';
import GuidingColumns from './GuidingColumns';

export class Board extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div className='board-wrapper'>
                <GuidingRows/>
                <Squares position={this.props.position}/>
                <GuidingColumns/>
            </div>
        )
    }
}

export default Board