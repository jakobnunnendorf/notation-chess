import Board from "@/components/Board";
import GameContextProvider, { GameContext } from "@/context/GameContext";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <GameContextProvider>
        <Board />
      </GameContextProvider>
    </main>
  );
}
