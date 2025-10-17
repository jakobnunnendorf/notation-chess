import React from "react";

export default function Tile({ even }: { even: boolean }) {
  return (
    <div
      className={`border ${even ? "bg-gray-200" : "bg-white"} h-12 w-12`}
    ></div>
  );
}
