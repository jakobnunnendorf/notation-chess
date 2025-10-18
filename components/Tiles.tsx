import React from "react";
import Tile from "./Tile";

export default function Tiles({
  setActiveTile,
  setActivePiece,
  availableTiles,
  activePiece,
  occupiedSquares,
}: {
  setActiveTile: (coord: Coord) => void;
  setActivePiece: (piece: number | null) => void;
  availableTiles: Coord[];
  activePiece: number | null;
  occupiedSquares: OccupiedSquare[];
}) {
    const tiles = Array(8).fill(Array(8).fill(null));
  return (
    <div className="absolute grid w-full h-full grid-cols-8 border grid-rows-8">
      {tiles.map((_, y) => {
        return tiles.map((_, x) => (
          <Tile
            key={`${y + 1}-${x + 1}`}
            even={(y + x) % 2 == 1}
            setActiveTile={setActiveTile}
            activePiece={activePiece}
            setActivePiece={setActivePiece}
            coordinate={[x + 1, y + 1]}
            available={availableTiles.some(
              (tile) => tile[1] === y + 1 && tile[0] === x + 1
            )}
          />
        ));
      })}
    </div>
  );
}
