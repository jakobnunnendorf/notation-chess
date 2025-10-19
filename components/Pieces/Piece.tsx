import Image from "next/image";
import { capturePiece, equalCoord } from "@/logic/movement";
import { useGame } from "@/context/GameContext";

export default function Piece({
  id,
  pieceType,
  colour,
  coordinate,
}: {
  id: number;
  pieceType: string;
  colour: string;
  coordinate: Coord;
}) {
  const {
    activePiece,
    setActivePiece,
    availableTiles,
    turn,
    toggleTurn,
    piecesMetaData,
    setPiecesMetaData,
    boardSide,
    winner,
  } = useGame();

  return (
    <button
      onClick={() => {
        if (!winner) {
          const thisPiece: PieceMetaData = {
            id,
            colour,
            coord: coordinate,
            pieceType,
          };
          if (!activePiece && turn === colour) setActivePiece(thisPiece);
          else if (activePiece) {
            if (activePiece.id === id) setActivePiece(null);
            else {
              // If same colour, just change active piece to this one
              if (activePiece.colour === colour) setActivePiece(thisPiece);
              else {
                // If different colour, check if this field is available for the active piece
                if (
                  !availableTiles.some((tile) => equalCoord(tile, coordinate))
                )
                  setActivePiece(null);
                // If not available deselect active piece
                else {
                  // if it is available AND active piece is a different piece, capture it
                  const newPosition = capturePiece(
                    piecesMetaData,
                    activePiece,
                    thisPiece
                  );
                  setPiecesMetaData(newPosition);
                  setActivePiece(null);
                  toggleTurn();
                }
              }
              // Active piece is enemy but this tile is not available
            }
          }
        }
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
  );
}
