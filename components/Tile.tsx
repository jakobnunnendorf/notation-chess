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
    setActivePiece,
    availableTiles,
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
      className={`relative border ${
        occupiedByEnemy
          ? "bg-red-200"
          : available
          ? "bg-green-200"
          : even
          ? "bg-gray-200"
          : "bg-white"
      } h-12 w-12`}
    >
      {/* Left side: show rank numbers (8..1) only on the first column */}
      {coordinate[0] === 1 ? (
        <span className="absolute top-0 left-0 px-1 text-xs select-none">
          {coordinate[1]}
        </span>
      ) : null}

      {/* Bottom side: show file letters (a..h) only on the last row */}
      {coordinate[1] === 8 ? (
        <span className="absolute bottom-0 right-0 px-1 text-xs select-none">
          {
            ["a", "b", "c", "d", "e", "f", "g", "h"].reverse()[
              coordinate[0] - 1
            ]
          }
        </span>
      ) : null}
    </button>
  );
}
