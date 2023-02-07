import React from 'react'

export default function Square(props) {
  return (
    <div className={`${props.color} square`} id={props.squarePos}></div>
  )
}
