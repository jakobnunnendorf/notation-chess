import Image from "next/image";
import Position from "./Position";

export default function Board() {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const squares: React.ReactNode[] = [];
  let square_light = true;
  for (let i = 8; i >= 1; i--) {
    files.map((file, index) => {
      squares.push(
        <div
          className={`w-12 aspect-square ${
            square_light ? "light-square" : "dark-square"
          } text-gray-400 flex justify-center items-center -z-50`}
        >{`${file}${i}`}</div>
      );
      square_light = !square_light;
    });
    square_light = !square_light;
  }
  return (
    <main className="h-96 aspect-square grid grid-cols-8 grid-rows-8 position-absolute">
      {squares}
      <Position />
    </main>
  );
}
