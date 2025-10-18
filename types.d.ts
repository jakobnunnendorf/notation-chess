type Coord = [number, number];
interface PieceMetaData {
  pieceType: string;
  colour: string;
  id: number;
  initialCoord: Coord;
}