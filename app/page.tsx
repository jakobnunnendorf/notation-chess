import Board from "@/components/Board";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Board />
    </main>
  );
}
