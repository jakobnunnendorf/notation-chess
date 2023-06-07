import React from "react";
import Image from "next/image";

interface iPieceInfo {
  kind: string;
  coordinates: [number, number];
  white_piece: boolean;
}

export default function Piece({ kind, coordinates, white_piece }: iPieceInfo) {
  let imagePath: string;
  switch (kind) {
    case "pawn":
      imagePath = `${
        white_piece ? "/pieces/white_pawn.png" : "/pieces/black_pawn.png"
      }`;
      break;
    case "bishop":
      imagePath = `${
        white_piece ? "/pieces/white_bishop.png" : "/pieces/black_bishop.png"
      }`;
      break;
    case "knight":
      imagePath = `${
        white_piece ? "/pieces/white_knight.png" : "/pieces/black_knight.png"
      }`;
      break;
    case "rook":
      imagePath = `${
        white_piece ? "/pieces/white_rook.png" : "/pieces/black_rook.png"
      }`;
      break;
    case "king":
      imagePath = `${
        white_piece ? "/pieces/white_king.png" : "/pieces/black_king.png"
      }`;
      break;
    case "queen":
      imagePath = `${
        white_piece ? "/pieces/white_queen.png" : "/pieces/black_queen.png"
      }`;
      break;
    default:
      imagePath = `${
        white_piece ? "/pieces/white_pawn.png" : "/pieces/black_pawn.png"
      }`;
      break;
  }
  const style = {
    position: "relative",
    zIndex: "9999999",
    gridColumn: "3/4",
    gridRow: `${coordinates[1]}/${coordinates[1]}`,
  };
  return (
    <div
      className={`w-1_9 aspect-square col-start-${coordinates[0]} row-start-${coordinates[1]} position-absolute`}
    >
      <Image src={imagePath} alt="" width={40} height={40} />
    </div>
  );
}
