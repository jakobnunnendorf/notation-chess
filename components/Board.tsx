"use client";

import React, { useState } from "react";
import { pieces } from "@/settings";
import Piece from "./Pieces/Piece";
import Tiles from "./Tiles";

interface OccupiedSquare {
  id: number;
  coord: Coord;
  colour: string;
}

export default function Board() {
  const [availableTiles, setAvailableTiles] = useState<Coord[]>([]);
  const [activeTile, setActiveTileState] = useState<Coord | null>(null);
  const [activePiece, setActivePiece] = useState<number | null>(null);
  const [occupiedSquares, setOccupiedSquares] = useState<OccupiedSquare[]>([]);

  const toggleAvailableTiles = (tiles: Coord[]) =>
    setAvailableTiles(availableTiles.length > 0 ? [] : tiles);

  const setActiveTile = (coordinate: Coord) => {
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

  return (
    <div className="relative grid grid-cols-8 border h-96 w-96 grid-rows-8">
      <Tiles
        setActiveTile={setActiveTile}
        setActivePiece={setActivePiece}
        availableTiles={availableTiles}
        activePiece={activePiece}
      />
      {pieces.map((piece: PieceMetaData) => {
        const newOccupiedSquare: OccupiedSquare = {
          id: piece.id,
          coord: piece.initialCoord,
          colour: piece.colour,
        };
        setOccupiedSquares([...occupiedSquares, newOccupiedSquare]);
        return (
          <Piece
            key={piece.id}
            id={piece.id}
            pieceType={piece.pieceType}
            colour={piece.colour}
            coordinate={piece.initialCoord}
            setActivePiece={setActivePiece}
            toggleAvailableTiles={toggleAvailableTiles}
            activeTile={activeTile}
            activePiece={activePiece}
          />
        );
      })}
    </div>
  );
}
