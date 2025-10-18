import React from "react";
import Tile from "./Tile";

export default function Tiles() {
  const tiles = Array(8).fill(Array(8).fill(null));
  return (
    <div className="absolute grid w-full h-full grid-cols-8 border grid-rows-8">
      {tiles.map((_, y) => {
        return tiles.map((_, x) => (
          <Tile
            key={`${y + 1}-${x + 1}`}
            even={(y + x) % 2 == 1}
            coordinate={[x + 1, y + 1]}
          />
        ));
      })}
    </div>
  );
}
