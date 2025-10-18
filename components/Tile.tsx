import { useGame } from "@/context/GameContext";
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
    occupiedSquares,
    activePiece,
  } = useGame();
  const [available, setAvailable] = useState<boolean>(false);
  const [occupiedByEnemy, setOccupiedByEnemy] = useState(false);

  useEffect(() => {
    const available = availableTiles.some(
      (tile) => tile[0] === coordinate[0] && tile[1] === coordinate[1]
    );
    setAvailable(available);

    const occupier = occupiedSquares.find(
      (square) =>
        square.coord[0] === coordinate[0] && square.coord[1] === coordinate[1]
    );
    if (!occupier || !available) return;
    const occupierIsEnemy =
      occupier && activePiece && occupier?.colour !== activePiece?.colour;
    setOccupiedByEnemy(Boolean(occupier && occupierIsEnemy));
  }, [availableTiles, occupiedSquares, activePiece, coordinate]);

  return (
    <button
      onClick={() => {
        if (available) {
          setActiveTile(activeTile ? null : coordinate);
        } else {
          setActivePiece(null);
          setActiveTile(null);
        }
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
