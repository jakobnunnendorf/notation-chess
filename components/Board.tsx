"use client";

import React from "react";
import Piece from "./Pieces/Piece";
import Tiles from "./Tiles";
import { useGame } from "@/context/GameContext";

export default function Board() {
  const { boardSide, piecesMetaData } = useGame();
  return (
    <div
      className={`relative grid grid-cols-8 ${
        boardSide === "white" ? "rotate-180" : ""
      } h-96 w-96 grid-rows-8`}
    >
      <Tiles />
      {piecesMetaData.map((piece: PieceMetaData) => (
        <Piece
          key={piece.id}
          id={piece.id}
          pieceType={piece.pieceType}
          colour={piece.colour}
          coordinate={piece.coord}
        />
      ))}
    </div>
  );
}
