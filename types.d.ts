type Coord = [number, number];
interface PieceMetaData {
  pieceType: string;
  colour: string;
  id: number;
  initialCoord: Coord;
}
interface OccupiedSquare {
  id: number;
  coord: Coord;
  colour: string;
}
