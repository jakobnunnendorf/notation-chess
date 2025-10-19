"use client";
import { useGame } from "@/context/GameContext";

export default function Flip() {
  const { boardSide, setBoardSide } = useGame();
  return (
    <button
      onClick={() => setBoardSide(boardSide === "white" ? "black" : "white")}
      className="w-16 px-3 py-2 mb-8 border rounded-full bg-slate-100"
    >
      Flip
    </button>
  );
}
