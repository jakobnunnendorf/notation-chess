"use client";

import React, { useState, createContext, useContext, useEffect } from "react";
import { pieces } from "@/settings";
import { getAvailableTiles, isMate } from "@/logic/movement";

interface GameContextType {
  piecesMetaData: PieceMetaData[];
  setPiecesMetaData: React.Dispatch<React.SetStateAction<PieceMetaData[]>>;
  activePiece: PieceMetaData | null;
  setActivePiece: React.Dispatch<React.SetStateAction<PieceMetaData | null>>;
  activeTile: Coord | null;
  setActiveTile: React.Dispatch<React.SetStateAction<Coord | null>>;
  availableTiles: Coord[];
  setAvailableTiles: React.Dispatch<React.SetStateAction<Coord[]>>;
  boardSide: "black" | "white";
  setBoardSide: (colour: "black" | "white") => void;
  turn: "black" | "white";
  toggleTurn: () => void;
  winner: "black" | "white" | null;
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
  const [boardSide, setBoardSide] = useState<"black" | "white">("white");
  const [turn, setTurn] = useState<"black" | "white">("white");
  const [winner, setWinner] = useState<"black" | "white" | null>(null);

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

  useEffect(() => {
    if (!activePiece) setAvailableTiles([]);
    else {
      const tiles: Coord[] = getAvailableTiles(
        piecesMetaData,
        activePiece.coord,
        activePiece.pieceType,
        activePiece.colour
      );
      setAvailableTiles(tiles);
    }
  }, [activePiece]);

  useEffect(() => {
    if (isMate(piecesMetaData, turn))
      setWinner(turn === "white" ? "black" : "white");
  }, [turn]);

  const toggleTurn = () => {
    setTurn((prev) => (prev === "white" ? "black" : "white"));
  };

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
    setBoardSide,
    turn,
    toggleTurn,
    winner,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameContextProvider");
  return ctx;
}
