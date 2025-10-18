type Coord = [number, number];
interface PieceMetaData {
  type: string;
  colour: string;
  id: number;
  initialCoord: Coord;
}