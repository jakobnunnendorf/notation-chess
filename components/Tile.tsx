import React from "react";

export default function Tile({
  even,
  available,
  setActiveTile,
  setActivePiece,
  coordinate,
}: {
  even: boolean;
  available: boolean;
  setActiveTile: (coordinate: [number, number]) => void;
  activePiece: number | null;
  setActivePiece: (id: number | null) => void;
  coordinate: [number, number];
}) {
  return (
    <button
      onClick={() => {
        setActiveTile(coordinate);
        setActivePiece(null);
      }}
      className={`border ${
        available ? "bg-green-200" : even ? "bg-gray-200" : "bg-white"
      } h-12 w-12`}
    ></button>
  );
}
