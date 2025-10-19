"use client";

import { useGame } from "@/context/GameContext";
import React, { useEffect, useState } from "react";

function BlackProgress({ progress }: { progress: number }) {
  return (
    <div style={{ height: progress * 384 }} className="w-full bg-black"></div>
  );
}

export default function ProgressBar() {
  const { piecesMetaData } = useGame();
  const [progress, setProgress] = useState(0.5);

  useEffect(() => {
    const blackCount = piecesMetaData.filter(
      (piece) => piece.colour === "black"
    ).length;
    const whiteCount = piecesMetaData.filter(
      (piece) => piece.colour === "white"
    ).length;
    const total = whiteCount + blackCount || 1; // Avoid div/0
    const progress = whiteCount / total;

    setProgress(progress);
  }, [piecesMetaData]);
  return (
    <div className="flex items-end w-8 border-r-2 h-96">
      <BlackProgress progress={progress} />
    </div>
  );
}
