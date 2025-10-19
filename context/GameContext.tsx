"use client";

import React, { useState, createContext, useContext, useEffect } from "react";
import { pieces } from "@/settings";

interface GameContextType {
  piecesMetaData: PieceMetaData[];
  setPiecesMetaData: React.Dispatch<React.SetStateAction<PieceMetaData[]>>;
  activePiece: PieceMetaData | null;
  setActivePiece: React.Dispatch<React.SetStateAction<PieceMetaData | null>>;
  activeTile: Coord | null;
  setActiveTile: React.Dispatch<React.SetStateAction<Coord | null>>;
  availableTiles: Coord[];
  setAvailableTiles: React.Dispatch<React.SetStateAction<Coord[]>>;
  boardSide: "black"|"white"
  setBoardSide:(colour:"black"|"white")=>void
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
  const [activePiece, setActivePiece] = useState<PieceMetaData | null>(null);
  const [piecesMetaData, setPiecesMetaData] = useState<PieceMetaData[]>([]);
  const [boardSide, setBoardSide]=useState<"black"|"white">("white")

  useEffect(() => {
    const initialPiecesMetaData = pieces.map((piece: PieceMetaData) => {
      const newPieceMetaData: PieceMetaData = {
        pieceType: piece.pieceType,
        id: piece.id,
        coord: piece.coord,
        colour: piece.colour,
      };
      return newPieceMetaData;
    });
    setPiecesMetaData(initialPiecesMetaData);
  }, []);

  useEffect(()=>{
  },[boardSide])

  useEffect(() => {
    if (activePiece === null) setAvailableTiles([]);
  }, [activePiece]);

  const value: GameContextType = {
    piecesMetaData,
    setPiecesMetaData,
    activePiece,
    setActivePiece,
    activeTile,
    setActiveTile,
    availableTiles,
    setAvailableTiles,
    boardSide,
    setBoardSide
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameContextProvider");
  return ctx;
}
