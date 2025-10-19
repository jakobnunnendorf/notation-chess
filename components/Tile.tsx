import { useGame } from "@/context/GameContext";
import { movePiece } from "@/logic/movement";
import { findOccupier, isTileAvailable } from "@/logic/squareInfo";
import React from "react";

export default function Tile({
  even,
  coordinate,
}: {
  even: boolean;
  coordinate: [number, number];
}) {
  const {
    setActivePiece,
    availableTiles,
    piecesMetaData,
    setPiecesMetaData,
    activePiece,
    boardSide,
    turn,
    toggleTurn,
    winner,
  } = useGame();
  const occupier = findOccupier(piecesMetaData, coordinate);
  const available = isTileAvailable(availableTiles, coordinate);
  return (
    <button
      onClick={() => {
        if (!winner) {
          if (
            activePiece &&
            !occupier &&
            available &&
            turn === activePiece.colour
          ) {
            const newPosition = movePiece(
              activePiece.pieceType,
              piecesMetaData,
              activePiece.id,
              coordinate,
              activePiece.colour
            );
            setPiecesMetaData(newPosition);
            toggleTurn();
          }
          setActivePiece(null);
        }
      }}
      className={`relative ${
        occupier && occupier.colour !== activePiece?.colour && available
          ? "bg-red-200"
          : available
          ? "bg-green-200"
          : even
          ? "bg-gray-200"
          : "bg-white"
      } h-12 w-12`}
    >
      <ColLabel coordinate={coordinate} boardSide={boardSide} />
      <RowLabel coordinate={coordinate} boardSide={boardSide} />
    </button>
  );
}

const ColLabel = ({
  coordinate,
  boardSide,
}: {
  coordinate: Coord;
  boardSide: "black" | "white";
}) => {
  /* Bottom side: show file letters (a..h) only on the last row */

  return coordinate[1] === 8 && boardSide === "black" ? (
    <span className="absolute bottom-0 left-0 px-1 text-[0.5rem] opacity-50 select-none">
      {["a", "b", "c", "d", "e", "f", "g", "h"].reverse()[coordinate[0] - 1]}
    </span>
  ) : coordinate[1] === 1 && boardSide === "white" ? (
    <span className="absolute top-0 right-0 px-1 text-[0.5rem] opacity-50 rotate-180 select-none">
      {["a", "b", "c", "d", "e", "f", "g", "h"].reverse()[coordinate[0] - 1]}
    </span>
  ) : null;
};

const RowLabel = ({
  coordinate,
  boardSide,
}: {
  coordinate: Coord;
  boardSide: "black" | "white";
}) => {
  /* Left side: show rank numbers (8..1) only on the first column */
  return coordinate[0] === 8 && boardSide === "black" ? (
    <span className="absolute top-0 right-0 px-1 text-[0.5rem] opacity-50 select-none">
      {coordinate[1]}
    </span>
  ) : coordinate[0] === 1 && boardSide === "white" ? (
    <span className="absolute bottom-0 left-0 px-1 text-[0.5rem] opacity-50 rotate-180 select-none">
      {coordinate[1]}
    </span>
  ) : null;
};
