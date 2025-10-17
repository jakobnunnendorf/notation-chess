import React from "react";

export default function Tile({
  even,
  available,
  setActiveTile,
  coordinate,
}: {
  even: boolean;
  available: boolean;
  setActiveTile: (coordinate: [number, number]) => void;
  coordinate: [number, number];
}) {
  console.log("Tile rendered:", coordinate);
  return (
    <button
      onClick={() => {
        console.log(coordinate);
        setActiveTile(coordinate);
      }}
      className={`border ${
        available ? "bg-green-200" : even ? "bg-gray-200" : "bg-white"
      } h-12 w-12`}
    ></button>
  );
}
