import Board from "@/components/Board";
import GameContextProvider from "@/context/GameContext";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen">
      <GameContextProvider>
        <ProgressBar />
        <Board />
      </GameContextProvider>
    </main>
  );
}
