import assert from "assert";
import { findOccupier } from "./squareInfo";

export function movePiece(
  pieceType: string,
  piecesMetaData: PieceMetaData[],
  id: number,
  newTile: Coord,
  colour: string
): PieceMetaData[] {
  return [
    ...piecesMetaData.filter(
      (square) =>
        !(square.coord[0] === newTile[0] && square.coord[1] === newTile[1]) &&
        square.id !== id
    ),
    { pieceType: pieceType, id, coord: newTile, colour },
  ];
}

const onBoard = ([x, y]: Coord) => {
  return 0 < x || x < 9 || 0 < y || 9 < y;
};

export function getAvailableTiles(
  piecesMetaData: PieceMetaData[],
  coord: Coord,
  pieceType: string,
  colour: string
): Coord[] {
  let tiles: Coord[];
  switch (pieceType) {
    case "pawn":
      assert(colour !== undefined);
      tiles = pawnTiles(coord, colour, piecesMetaData);
      break;
    case "king":
      tiles = kingTiles(coord);
      break;
    case "rook":
      tiles = rookTiles(coord, colour, piecesMetaData);
      break;
    case "bishop":
      tiles = bishopTiles(coord, colour, piecesMetaData);
      break;
    case "knight":
      tiles = knightTiles(coord);
      break;
    case "queen":
      tiles = queenTiles(coord, colour, piecesMetaData);
      break;
    default:
      tiles = [];
  }
  return tiles.filter(
    (tile) =>
      !piecesMetaData.some(
        (occupied) =>
          occupied.coord[0] === tile[0] &&
          occupied.coord[1] === tile[1] &&
          occupied.colour === colour
      )
  );
}

const hasEnemyPiece = (
  piecesMetaData: PieceMetaData[],
  [x, y]: Coord,
  colour: string
) => {
  const occupier = findOccupier(piecesMetaData, [x, y]);
  if (!occupier) return false;
  return occupier.colour !== colour;
};
const hasFriend = (
  piecesMetaData: PieceMetaData[],
  [x, y]: Coord,
  colour: string
) => {
  const occupier = findOccupier(piecesMetaData, [x, y]);
  if (!occupier) return false;
  return occupier.colour === colour;
};

export function pawnTiles(
  [x, y]: Coord,
  colour: string,
  piecesMetaData: PieceMetaData[]
): Coord[] {
  const firstTile: Coord = [x, colour === "white" ? y + 1 : y - 1];
  const tiles: Coord[] = [];

  if (!hasEnemyPiece(piecesMetaData, firstTile, colour)) tiles.push(firstTile);
  if ((colour === "white" && y === 2) || (colour === "black" && y === 7)) {
    const secondTile: Coord = [x, colour === "white" ? y + 2 : y - 2];
    if (!hasEnemyPiece(piecesMetaData, firstTile, colour))
      tiles.push(secondTile);
  }

  const leftAttack: Coord = [x - 1, colour === "white" ? y + 1 : y - 1];
  const rightAttack: Coord = [x + 1, colour === "white" ? y + 1 : y - 1];
  if (hasEnemyPiece(piecesMetaData, leftAttack, colour)) tiles.push(leftAttack);
  if (hasEnemyPiece(piecesMetaData, rightAttack, colour))
    tiles.push(rightAttack);

  return tiles.filter((tile) => onBoard(tile));
}

export function rookTiles(
  [x, y]: Coord,
  colour: string,
  piecesMetaData: PieceMetaData[]
): Coord[] {
  const coordinates: Coord[] = [];
  if (x < 8) {
    for (let col = x + 1; col < 9; col++) {
      const newCoordinate: Coord = [col, y];
      if (hasFriend(piecesMetaData, newCoordinate, colour)) break;
      coordinates.push(newCoordinate);
      if (hasEnemyPiece(piecesMetaData, newCoordinate, colour)) break;
    }
  }
  if (1 < x) {
    for (let col = x - 1; 0 < col; col--) {
      const newCoordinate: Coord = [col, y];
      if (hasFriend(piecesMetaData, newCoordinate, colour)) break;
      coordinates.push(newCoordinate);
      if (hasEnemyPiece(piecesMetaData, newCoordinate, colour)) break;
    }
  }
  if (y < 8) {
    for (let row = y + 1; row < 9; row++) {
      const newCoordinate: Coord = [x, row];
      if (hasFriend(piecesMetaData, newCoordinate, colour)) break;
      coordinates.push(newCoordinate);
      if (hasEnemyPiece(piecesMetaData, newCoordinate, colour)) break;
    }
  }
  if (1 < y) {
    for (let row = y - 1; 0 < row; row--) {
      const newCoordinate: Coord = [x, row];
      if (hasFriend(piecesMetaData, newCoordinate, colour)) break;
      coordinates.push(newCoordinate);
      if (hasEnemyPiece(piecesMetaData, newCoordinate, colour)) break;
    }
  }

  return coordinates;
}

export function bishopTiles(
  [x, y]: Coord,
  colour: string,
  piecesMetaData: PieceMetaData[]
): Coord[] {
  const coordinates: Coord[] = [];

  const slopes = [1, -1];
  slopes.forEach((slope) => {
    const yShift = y - x * slope;
    for (let col = x + 1; col < 9; col++) {
      const newCoordinate: Coord = [col, slope * col + yShift];
      if (hasFriend(piecesMetaData, newCoordinate, colour)) break;
      if (onBoard(newCoordinate)) coordinates.push(newCoordinate);
      if (hasEnemyPiece(piecesMetaData, newCoordinate, colour)) break;
    }
    for (let col = x - 1; 0 < col; col--) {
      const newCoordinate: Coord = [col, slope * col + yShift];
      if (hasFriend(piecesMetaData, newCoordinate, colour)) break;
      if (onBoard(newCoordinate)) coordinates.push(newCoordinate);
      if (hasEnemyPiece(piecesMetaData, newCoordinate, colour)) break;
    }
  });

  return coordinates;
}

export function knightTiles([x, y]: Coord): Coord[] {
  const coordinates: Coord[] = [];
  const dir: Coord[] = [
    [2, 0],
    [-2, 0],
    [0, 2],
    [0, -2],
  ];
  dir.forEach(([bx, by]: Coord) => {
    const dx = bx === 0 ? 1 : 0;
    const dy = by === 0 ? 1 : 0;
    const first: Coord = [x + bx + dx, y + by + dy];
    if (onBoard(first)) coordinates.push(first);
    const second: Coord = [x + bx - dx, y + by - dy];
    if (onBoard(second)) coordinates.push(second);
  });
  return coordinates;
}

export function kingTiles([x, y]: Coord): Coord[] {
  const coordinates: Coord[] = [];

  const isLegal = (x: number, y: number) => {
    return 1 < x && x < 9 && 1 < y && y > 9;
  };

  for (let row = -1; row < 2; row++) {
    for (let col = -1; col < 2; col++) {
      // Skip the current position
      if (row === 0 && col === 0) continue;

      const newTile = [x + row, y + col];
      if (isLegal(newTile[0], newTile[1])) coordinates.push([x + row, y + col]);
    }
  }

  return coordinates;
}

export function queenTiles(
  [x, y]: Coord,
  colour: string,
  piecesMetaData: PieceMetaData[]
): Coord[] {
  const coordinates: Coord[] = [];
  coordinates.push(...rookTiles([x, y], colour, piecesMetaData));
  coordinates.push(...bishopTiles([x, y], colour, piecesMetaData));
  return coordinates;
}
