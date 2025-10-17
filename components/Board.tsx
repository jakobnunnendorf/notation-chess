"use client";

import React, { useState } from "react";
import Tile from "./Tile";
import Piece from "./Pieces/Piece";

export default function Board() {
  const [availableTiles, setAvailableTiles] = useState<[number, number][]>([]);
  const tiles = Array(8).fill(Array(8).fill(null));
  const toggleAvailableTiles = (tiles: [number, number][]) => {
    if (availableTiles.length > 0) {
      setAvailableTiles([]);
    } else {
      setAvailableTiles(tiles);
    }
  };

  return (
    <div className="relative grid grid-cols-8 border h-96 w-96 grid-rows-8">
      <div className="absolute grid w-full h-full grid-cols-8 border -z-10 grid-rows-8">
        {tiles.map((_, row) => {
          return tiles.map((_, col) => (
            <Tile
              key={`${row + 1}-${col + 1}`}
              even={(row + col) % 2 == 1}
              available={availableTiles.some(
                (tile) => tile[1] === row + 1 && tile[0] === col + 1
              )}
            />
          ));
        })}
      </div>
      <Piece
        type="King"
        color="black"
        toggleAvailableTiles={toggleAvailableTiles}
      />
    </div>
  );
}
