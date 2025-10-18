export function findOccupier(
  occupiedSquares: PieceMetaData[],
  coordinate: Coord
): PieceMetaData | undefined {
  const occupier = occupiedSquares.find(
    (square) =>
      square.coord[0] === coordinate[0] && square.coord[1] === coordinate[1]
  );
  return occupier;
}

export function isTileAvailable(
  availableTiles: Coord[],
  coordinate: Coord
): boolean {
  return availableTiles.some(
    (tile) => tile[0] === coordinate[0] && tile[1] === coordinate[1]
  );
}

export function tileIsOccupiedByEnemy(
  occupier: PieceMetaData | undefined,
  activePiece: PieceMetaData | null
): boolean {
  if (!activePiece || !occupier) return false;
  return occupier.colour !== activePiece.colour;
}
