"use client";

import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import Piece from "./Pieces/Piece";

export default function Board() {
  const [availableTiles, setAvailableTiles] = useState<[number, number][]>([]);
  const [activeTile, setActiveTileState] = useState<[number, number] | null>(
    null
  );
  const [activePiece, setActivePiece] = useState<number | null>(null);
  const tiles = Array(8).fill(Array(8).fill(null));

  // Log when activePiece changes
  useEffect(() => {
    console.log("activePiece changed to:", activePiece);
  }, [activePiece]);

  // Log when activeTile changes
  useEffect(() => {
    console.log("activeTile changed to:", activeTile);
  }, [activeTile]);

  const toggleAvailableTiles = (tiles: [number, number][]) => {
    console.log("toggleAvailableTiles called with:", tiles);
    if (availableTiles.length > 0) {
      console.log("Clearing available tiles");
      setAvailableTiles([]);
    } else {
      console.log("Setting available tiles:", tiles);
      setAvailableTiles(tiles);
    }
  };

  const setActiveTile = (coordinate: [number, number]) => {
    console.log("setActiveTile called with:", coordinate);
    console.log("availableTiles:", availableTiles);
    console.log("activePiece before:", activePiece);

    // Only move the piece if this tile is available for the active piece
    if (
      availableTiles.some(
        (tile) => tile[0] === coordinate[0] && tile[1] === coordinate[1]
      )
    ) {
      console.log("Moving to available tile:", coordinate);
      setActiveTileState(coordinate);
    } else {
      // Clear selection when clicking non-available tiles
      console.log("Clearing selection");
      setAvailableTiles([]);
      setActivePiece(null);
    }
  };
  return (
    <div className="relative grid grid-cols-8 border h-96 w-96 grid-rows-8">
      <div className="absolute grid w-full h-full grid-cols-8 border grid-rows-8">
        {tiles.map((_, y) => {
          return tiles.map((_, x) => (
            <Tile
              key={`${y + 1}-${x + 1}`}
              even={(y + x) % 2 == 1}
              setActiveTile={setActiveTile}
              activePiece={activePiece}
              setActivePiece={setActivePiece}
              coordinate={[x + 1, y + 1]}
              available={availableTiles.some(
                (tile) => tile[1] === y + 1 && tile[0] === x + 1
              )}
            />
          ));
        })}
      </div>
      <Piece
        type="King"
        color="black"
        id={1}
        toggleAvailableTiles={toggleAvailableTiles}
        activeTile={activeTile}
        activePiece={activePiece}
        setActivePiece={setActivePiece}
      />
    </div>
  );
}
