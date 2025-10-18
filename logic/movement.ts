import assert from "assert";
import { findOccupier } from "./squareInfo";

export function shouldThisPieceMove(
  activePiece: OccupiedSquare | null,
  id: number,
  activeTile: Coord | null,
  availableTiles: Coord[],
  coordinate: Coord
): boolean {
  if (!activeTile) return false;
  return (
    activePiece?.id === id &&
    availableTiles.some(
      (tile) => tile[0] === activeTile[0] && tile[1] === activeTile[1]
    ) &&
    (activeTile[0] !== coordinate[0] || activeTile[1] !== coordinate[1])
  );
}

export function movePiece(
  occupiedSquares: OccupiedSquare[],
  id: number,
  newTile: Coord,
  colour: string
): OccupiedSquare[] {
  return [
    ...occupiedSquares.filter(
      (square) =>
        !(square.coord[0] === newTile[0] && square.coord[1] === newTile[1]) &&
        square.id !== id
    ),
    { id, coord: newTile, colour },
  ];
}

const onBoard = ([x, y]: Coord) => {
  return 0 < x || x < 9 || 0 < y || 9 < y;
};

export function getAvailableTiles(
  occupiedSquares: OccupiedSquare[],
  coord: Coord,
  pieceType: string,
  colour: string
): Coord[] {
  let tiles: Coord[];
  switch (pieceType) {
    case "pawn":
      assert(colour !== undefined);
      tiles = pawnTiles(coord, colour, occupiedSquares);
      break;
    case "king":
      tiles = kingTiles(coord);
      break;
    case "rook":
      tiles = rookTiles(coord);
      break;
    case "bishop":
      tiles = bishopTiles(coord, colour, occupiedSquares);
      break;
    case "knight":
      tiles = knightTiles(coord);
      break;
    case "queen":
      tiles = queenTiles(coord, colour, occupiedSquares);
      break;
    default:
      tiles = [];
  }
  return tiles.filter(
    (tile) =>
      !occupiedSquares.some(
        (occupied) =>
          occupied.coord[0] === tile[0] &&
          occupied.coord[1] === tile[1] &&
          occupied.colour === colour
      )
  );
}

const hasEnemyPiece = (
  occupiedSquares: OccupiedSquare[],
  [x, y]: Coord,
  colour: string
) => {
  const occupier = findOccupier(occupiedSquares, [x, y]);
  if (!occupier) return false;
  return occupier.colour !== colour;
};
const hasFriend = (
  occupiedSquares: OccupiedSquare[],
  [x, y]: Coord,
  colour: string
) => {
  const occupier = findOccupier(occupiedSquares, [x, y]);
  if (!occupier) return false;
  return occupier.colour === colour;
};

export function pawnTiles(
  [x, y]: Coord,
  colour: string,
  occupiedSquares: OccupiedSquare[]
): Coord[] {
  const firstTile: Coord = [x, colour === "white" ? y + 1 : y - 1];
  const tiles: Coord[] = [];

  if (!hasEnemyPiece(occupiedSquares, firstTile, colour)) tiles.push(firstTile);
  if ((colour === "white" && y === 2) || (colour === "black" && y === 7)) {
    const secondTile: Coord = [x, colour === "white" ? y + 2 : y - 2];
    if (!hasEnemyPiece(occupiedSquares, firstTile, colour))
      tiles.push(secondTile);
  }

  const leftAttack: Coord = [x - 1, colour === "white" ? y + 1 : y - 1];
  const rightAttack: Coord = [x + 1, colour === "white" ? y + 1 : y - 1];
  if (hasEnemyPiece(occupiedSquares, leftAttack, colour))
    tiles.push(leftAttack);
  if (hasEnemyPiece(occupiedSquares, rightAttack, colour))
    tiles.push(rightAttack);

  return tiles.filter((tile) => onBoard(tile));
}

export function rookTiles([x, y]: Coord): Coord[] {
  const coordinates: Coord[] = [];

  for (let col = 1; col < 9; col++) {
    // Skip the current position
    if (col === x) continue;
    const newTile: Coord = [col, y];
    if (onBoard(newTile)) coordinates.push(newTile);
  }
  for (let row = 1; row < 9; row++) {
    // Skip the current position
    if (row === y) continue;
    const newTile: Coord = [x, row];
    if (onBoard(newTile)) coordinates.push(newTile);
  }

  return coordinates;
}

export function bishopTiles(
  [x, y]: Coord,
  colour: string,
  occupiedSquares: OccupiedSquare[]
): Coord[] {
  const coordinates: Coord[] = [];

  const slopes = [1, -1];
  slopes.forEach((slope) => {
    const yShift = y - x * slope;
    for (let col = x + 1; col < 9; col++) {
      const newCoordinate: Coord = [col, slope * col + yShift];
      if (hasFriend(occupiedSquares, newCoordinate, colour)) break;
      if (onBoard(newCoordinate)) coordinates.push(newCoordinate);
      if (hasEnemyPiece(occupiedSquares, newCoordinate, colour)) break;
    }
    for (let col = x - 1; 0 < col; col--) {
      const newCoordinate: Coord = [col, slope * col + yShift];
      if (hasFriend(occupiedSquares, newCoordinate, colour)) break;
      if (onBoard(newCoordinate)) coordinates.push(newCoordinate);
      if (hasEnemyPiece(occupiedSquares, newCoordinate, colour)) break;
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
  occupiedSquares: OccupiedSquare[]
): Coord[] {
  const coordinates: Coord[] = [];
  coordinates.push(...rookTiles([x, y]));
  coordinates.push(...bishopTiles([x, y], colour, occupiedSquares));
  return coordinates;
}
