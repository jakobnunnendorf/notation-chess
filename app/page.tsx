import Board from "@/components/Board";
import GameContextProvider from "@/context/GameContext";
import ProgressBar from "@/components/ProgressBar";
import Flip from "@/components/Flip";

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col h-screen">
      <GameContextProvider>
        <Flip/>
        <div className="flex">
          <ProgressBar />
        <Board /></div>
      </GameContextProvider>
    </main>
  );
}
