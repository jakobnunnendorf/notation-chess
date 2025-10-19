"use client";
import { useGame } from "@/context/GameContext";

export default function Turn() {
  const { turn, winner } = useGame();

  const toUpper = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return winner ? `${toUpper(winner)} won!!!` : `${toUpper(turn)} to play`;
}
