export function findOccupier(
  occupiedSquares: OccupiedSquare[],
  coordinate: Coord
): OccupiedSquare | undefined {
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
  occupier: OccupiedSquare | undefined,
  activePiece: OccupiedSquare | null
): boolean {
  if (!activePiece || !occupier) return false;
  return occupier.colour !== activePiece.colour;
}
