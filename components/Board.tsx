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

  const toggleAvailableTiles = (tiles: [number, number][]) =>
    setAvailableTiles(availableTiles.length > 0 ? [] : tiles);

  const setActiveTile = (coordinate: [number, number]) => {
    // Only move the piece if this tile is available for the active piece
    if (
      availableTiles.some(
        (tile) => tile[0] === coordinate[0] && tile[1] === coordinate[1]
      )
    ) {
      setActiveTileState(coordinate);
    } else {
      // Clear selection when clicking non-available tiles
      setAvailableTiles([]);
      setActivePiece(null);
    }
  };
  const colours = ["black", "white"];
  const initialPieceColumns = {
    king: { col: [4], row: 1 },
    queen: { col: [5], row: 1 },
    bishop: { col: [3, 6], row: 1 },
    knight: { col: [2, 7], row: 1 },
    rook: { col: [1, 8], row: 1 },
    pawn: { col: [1, 2, 3, 4, 5, 6, 7, 8], row: 2 },
  };
  const pieces: JSX.Element[] = [];
  colours.forEach((colour) => {
    Object.keys(initialPieceColumns).forEach((piece) => {
      initialPieceColumns[
        piece as keyof typeof initialPieceColumns
      ].col.forEach((col) => {
        const startingRow = colour === "white" ? 1 : 8;
        const row =
          piece === "pawn"
            ? colour === "white"
              ? startingRow + 1
              : startingRow - 1
            : startingRow;
        pieces.push(
          <Piece
            key={`${colour}-${piece}-${col}`}
            type={piece}
            color={colour}
            id={pieces.length + 1}
            toggleAvailableTiles={toggleAvailableTiles}
            activeTile={activeTile}
            activePiece={activePiece}
            setActivePiece={setActivePiece}
            coordinate={[col, row]}
          />
        );
      });
      return;
    });
    return;
  });

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
      {pieces.map((piece) => piece)}
    </div>
  );
}
