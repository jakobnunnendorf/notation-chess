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
