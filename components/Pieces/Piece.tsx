import Image from "next/image";
import { useState, useEffect } from "react";
import { getAvailableTiles, movePiece } from "@/logic/movement";
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
    availableTiles,
    setAvailableTiles,
    piecesMetaData,
    setPiecesMetaData,
    boardSide,
  } = useGame();

  useEffect(() => {
    const occupiedSquare = piecesMetaData.find((square) => square.id === id);
    if (!occupiedSquare) setAlive(false);
    else setAlive(true);
    if (occupiedSquare && occupiedSquare.coord !== coordinate)
      setCoordinate(occupiedSquare.coord);
  }, [piecesMetaData]);

  return alive ? (
    <button
      onClick={() => {
        const occupier = findOccupier(piecesMetaData, coordinate);
        if (activePiece && occupier && activePiece.id! !== occupier.id) {
          setPiecesMetaData(
            movePiece(
              pieceType,
              piecesMetaData,
              activePiece.id,
              coordinate,
              colour
            )
          );
        } else if (availableTiles.length === 0) {
          const tiles: Coord[] = getAvailableTiles(
            piecesMetaData,
            coordinate,
            pieceType,
            colour
          );
          setAvailableTiles(tiles);
        } else setAvailableTiles([]);
        setActivePiece(
          activePiece ? null : { pieceType, id, coord: coordinate, colour }
        );
      }}
      className={`absolute flex items-center justify-center w-12 h-12 ${
        boardSide === "white" ? "rotate-180" : ""
      }`}
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
