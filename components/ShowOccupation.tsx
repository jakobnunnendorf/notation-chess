"use client";

import { useGame } from "@/context/GameContext";
import React from "react";

export default function ShowOccupation() {
  const { piecesMetaData } = useGame();
  const whitePieces = piecesMetaData.filter(
    (piece) => piece.colour === "white"
  );
  const blackPieces = piecesMetaData.filter(
    (piece) => piece.colour === "black"
  );
  const notation = (coord: Coord): string => {
    const [x, y] = coord;
    const file = ["a", "b", "c", "d", "e", "f", "g", "h"][8 - x];
    return `${file}${y}`;
  };
  return (
    <div className="flex gap-5 p-8">
      <div>
        <div>White pieces: {whitePieces.length}</div>
        <ul>
          {whitePieces.map((piece) => (
            <li key={`${piece.colour}-${piece.pieceType}-${piece.id}`}>
              {piece.pieceType} {notation(piece.coord)}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div>Black pieces: {blackPieces.length}</div>
        <ul>
          {blackPieces.map((piece) => (
            <li key={`${piece.colour}-${piece.pieceType}-${piece.id}`}>
              {piece.pieceType} {notation(piece.coord)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
