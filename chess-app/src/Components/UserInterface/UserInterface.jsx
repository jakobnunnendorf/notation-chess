import React from 'react'
import './userInterface.css';

export default function UserInterface(props) {
  return (
    <div>
                <div>UserInterface</div>
                <form action="submit">
                    <input type="text" onChange={event => {props.advancePawn(event.target.value)}}/>
                </form>
            </div>
  )
}