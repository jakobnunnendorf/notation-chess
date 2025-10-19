import Board from "@/components/Board";
import GameContextProvider from "@/context/GameContext";
import ProgressBar from "@/components/ProgressBar";
import Flip from "@/components/Flip";
import Turn from "@/components/Turn";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <GameContextProvider>
        <Flip />
        <Turn />
        <div className="flex border-2">
          <ProgressBar />
          <Board />
        </div>
      </GameContextProvider>
    </main>
  );
}
