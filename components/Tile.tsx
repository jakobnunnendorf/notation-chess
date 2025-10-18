import { useGame } from "@/context/GameContext";
import React, { useState, useEffect } from "react";

export default function Tile({
  even,
  coordinate,
}: {
  even: boolean;
  coordinate: [number, number];
}) {
  const { setActiveTile, setActivePiece, availableTiles, activeTile } =
    useGame();
  const [available, setAvailable] = useState<boolean>(false);
  useEffect(() => {
    const available = availableTiles.some(
      (tile) => tile[0] === coordinate[0] && tile[1] === coordinate[1]
    );
    setAvailable(available);
  }, [availableTiles]);

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
        available ? "bg-green-200" : even ? "bg-gray-200" : "bg-white"
      } h-12 w-12`}
    ></button>
  );
}
