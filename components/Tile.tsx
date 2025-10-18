import { useGame } from "@/context/GameContext";
import { movePiece } from "@/logic/movement";
import {
  findOccupier,
  isTileAvailable,
  tileIsOccupiedByEnemy,
} from "@/logic/squareInfo";
import React, { useState, useEffect } from "react";

export default function Tile({
  even,
  coordinate,
}: {
  even: boolean;
  coordinate: [number, number];
}) {
  const {
    setActiveTile,
    setActivePiece,
    availableTiles,
    activeTile,
    piecesMetaData,
    setPiecesMetaData,
    activePiece,
    setAvailableTiles,
  } = useGame();
  const [available, setAvailable] = useState<boolean>(false);
  const [occupiedByEnemy, setOccupiedByEnemy] = useState(false);

  useEffect(() => {
    const tileIsAvailable = isTileAvailable(availableTiles, coordinate);
    setAvailable(isTileAvailable(availableTiles, coordinate));
    if (!tileIsAvailable) return;

    const occupier = findOccupier(piecesMetaData, coordinate);
    setOccupiedByEnemy(tileIsOccupiedByEnemy(occupier, activePiece));
  }, [availableTiles, piecesMetaData, activePiece, coordinate]);

  return (
    <button
      onClick={() => {
        if (activePiece && available) {
          setPiecesMetaData(
            movePiece(
              activePiece.pieceType,
              piecesMetaData,
              activePiece.id,
              coordinate,
              activePiece.colour
            )
          );
        }
        setAvailableTiles([]);
        setActivePiece(null);
      }}
      className={`border ${
        occupiedByEnemy
          ? "bg-red-200"
          : available
          ? "bg-green-200"
          : even
          ? "bg-gray-200"
          : "bg-white"
      } h-12 w-12`}
    ></button>
  );
}
