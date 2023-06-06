import React from "react";
import "./userInterface.css";

export default function UserInterface(props) {
  return (
    <div>
      <button onClick={() => props.advancePawn()}>advance pawn</button>
    </div>
  );
}
