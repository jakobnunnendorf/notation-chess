"use client";
import { useGame } from "@/context/GameContext";
import React from "react";

export default function Turn() {
  const { turn } = useGame();

  return <div>{turn.charAt(0).toUpperCase() + turn.slice(1)} to play</div>;
}
