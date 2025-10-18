"use client";

import React from "react";
import { pieces } from "@/settings";
import Piece from "./Pieces/Piece";
import Tiles from "./Tiles";

export default function Board() {
  return (
    <div className="relative grid grid-cols-8 border h-96 w-96 grid-rows-8">
      <Tiles />
      {pieces.map((piece: PieceMetaData) => (
        <Piece
          key={piece.id}
          id={piece.id}
          pieceType={piece.pieceType}
          colour={piece.colour}
          initialCoordinate={piece.coord}
        />
      ))}
    </div>
  );
}
