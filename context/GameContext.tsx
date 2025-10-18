"use client";

import React, { useState, createContext, useContext, useEffect } from "react";
import { pieces } from "@/settings";

interface GameContextType {
  occupiedSquares: OccupiedSquare[];
  setOccupiedSquares: React.Dispatch<React.SetStateAction<OccupiedSquare[]>>;
  activePiece: number | null;
  setActivePiece: React.Dispatch<React.SetStateAction<number | null>>;
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
  const [availableTiles, setAvailableTiles] = useState<Coord[]>([]);
  const [activeTile, setActiveTile] = useState<Coord | null>(null);
  const [activePiece, setActivePiece] = useState<number | null>(null);
  const [occupiedSquares, setOccupiedSquares] = useState<OccupiedSquare[]>([]);

  useEffect(() => {
    const initialOccupiedSquares = pieces.map((piece: PieceMetaData) => {
      const newOccupiedSquare: OccupiedSquare = {
        id: piece.id,
        coord: piece.initialCoord,
        colour: piece.colour,
      };
      return newOccupiedSquare;
    });
    setOccupiedSquares(initialOccupiedSquares);
  }, []);

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
