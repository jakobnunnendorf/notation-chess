import React from "react";

export default function Tile({
  even,
  available,
}: {
  even: boolean;
  available: boolean;
}) {
  return (
    <div
      className={`border ${
        available ? "bg-green-200" : even ? "bg-gray-200" : "bg-white"
      } h-12 w-12`}
    ></div>
  );
}
