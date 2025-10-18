"use client";

import React, { useState, createContext, useContext } from "react";

interface GameContextType {
  occupiedSquares: OccupiedSquare[];
  setOccupiedSquares: React.Dispatch<React.SetStateAction<OccupiedSquare[]>>;
  activePiece: OccupiedSquare | null;
  setActivePiece: React.Dispatch<React.SetStateAction<OccupiedSquare | null>>;
  activeTile: Coord | null;
  setActiveTile: React.Dispatch<React.SetStateAction<Coord | null>>;
  availableTiles: Coord[];
  setAvailableTiles: React.Dispatch<React.SetStateAction<Coord[]>>;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export default function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [occupiedSquares, setOccupiedSquares] = useState<OccupiedSquare[]>([]);
  const [activePiece, setActivePiece] = useState<OccupiedSquare | null>(null);
  const [activeTile, setActiveTile] = useState<Coord | null>(null);
  const [availableTiles, setAvailableTiles] = useState<Coord[]>([]);

  const value: GameContextType = {
    occupiedSquares,
    setOccupiedSquares,
    activePiece,
    setActivePiece,
    activeTile,
    setActiveTile,
    availableTiles,
    setAvailableTiles,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameContextProvider");
  return ctx;
}
