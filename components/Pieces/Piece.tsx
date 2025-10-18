import Image from "next/image";
import { useState, useEffect } from "react";
import { getAvailableTiles } from "@/logic/availableTiles";
import { useGame } from "@/context/GameContext";
import { findOccupier } from "@/logic/squareInfo";

export default function Piece({
  id,
  pieceType,
  colour,
  initialCoordinate,
}: {
  id: number;
  pieceType: string;
  colour: string;
  initialCoordinate: [number, number];
}) {
  const [coordinate, setCoordinate] = useState<Coord>(initialCoordinate);
  const [alive, setAlive] = useState(true);

  const {
    activePiece,
    setActivePiece,
    activeTile,
    availableTiles,
    setAvailableTiles,
    setActiveTile,
    occupiedSquares,
    setOccupiedSquares,
  } = useGame();

  useEffect(() => {
    if (
      activePiece?.id === id &&
      activeTile &&
      availableTiles.some(
        (tile) => tile[0] === activeTile[0] && tile[1] === activeTile[1]
      ) &&
      (activeTile[0] !== coordinate[0] || activeTile[1] !== coordinate[1])
    ) {
      setCoordinate(activeTile);
      setOccupiedSquares((prev) => {
        const filtered = prev.filter((square) => square.id !== id);
        return [...filtered, { id, coord: activeTile, colour, pieceType }];
      });
      setAvailableTiles([]);
      setActivePiece(null);
      setActiveTile(null);
    }
  }, [activeTile]);

  useEffect(() => {
    const occupiedSquare = occupiedSquares.find((square) => square.id === id);
    if (!occupiedSquare) setAlive(false);
    else {
      setAlive(true);
      setCoordinate(occupiedSquare.coord);
    }
  }, [occupiedSquares]);

  return alive ? (
    <button
      onClick={() => {
        const occupier = findOccupier(occupiedSquares, coordinate);
        if (activePiece && occupier && activePiece?.id! !== occupier?.id) {
          setOccupiedSquares(
            occupiedSquares.filter((square) => square.id !== occupier?.id)
          );
        }
        if (availableTiles.length === 0) {
          const tiles: Coord[] = getAvailableTiles(
            occupiedSquares,
            coordinate,
            pieceType,
            colour
          );
          setAvailableTiles(tiles);
        } else setAvailableTiles([]);
        setActivePiece(activePiece ? null : { id, coord: coordinate, colour });
      }}
      className="absolute flex items-center justify-center w-12 h-12 "
      style={{
        left: `${(coordinate[0] - 1) * 48}px`,
        top: `${(coordinate[1] - 1) * 48}px`,
      }}
    >
      <Image
        src={`/pieces/${colour}_${pieceType}.png`}
        alt={`${colour} ${pieceType}`}
        width={25}
        height={25}
      />
    </button>
  ) : null;
}
