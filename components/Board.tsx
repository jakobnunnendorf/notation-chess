import React from "react";
import Tile from "./Tile";

export default function Board() {
  const tiles = Array(8).fill(Array(8).fill(null));
  return (
    <div className="grid grid-cols-8 border h-96 w-96 grid-rows-8">
      {tiles.map((_, row) => {
        return tiles.map((_, col) => (
          <Tile key={`${row}-${col}`} even={(row + col) % 2 == 1} />
        ));
      })}
    </div>
  );
}
