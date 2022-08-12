import React from 'react';
import './chess.css';

import Board from './Components/Board/Board';
import Scoresheet from './Components/Scoresheet/Scoresheet';
import UserInterface from './Components/UserInterface/UserInterface';

function Chess() {
  return (
    <div className='chess-app'>
      <Board />
      <Scoresheet />
      <UserInterface />
    </div>
  );
}

export default Chess;
