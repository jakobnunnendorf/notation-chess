import Image from "next/image";
import { Component } from "react";
import {
  bishopTiles,
  kingTiles,
  knightTiles,
  pawnTiles,
  rookTiles,
} from "@/logic/availableTiles";

interface PieceProps {
  id: number;
  type: string;
  color: string;
  toggleAvailableTiles: (tiles: [number, number][]) => void;
  activeTile: [number, number] | null;
  activePiece: number | null;
  setActivePiece: (piece: number | null) => void;
  coordinate: [number, number];
}

interface PieceState {
  alive: boolean;
  x: number;
  y: number;
}

export default class Piece extends Component<PieceProps, PieceState> {
  constructor(props: PieceProps) {
    super(props);
    this.state = {
      alive: true,
      x: props.coordinate[0],
      y: props.coordinate[1],
    };
  }

  toggleAvailableTilesForThisPiece = (coord: Coord) => {
    if (this.props.type === "pawn")
      this.props.toggleAvailableTiles(pawnTiles(coord, this.props.color));
    else if (this.props.type === "king")
      this.props.toggleAvailableTiles(kingTiles(coord));
    else if (this.props.type === "rook")
      this.props.toggleAvailableTiles(rookTiles(coord));
    else if (this.props.type === "bishop")
      this.props.toggleAvailableTiles(bishopTiles(coord));
    else if (this.props.type === "knight")
      this.props.toggleAvailableTiles(knightTiles(coord));
  };

  componentDidUpdate(prevProps: Readonly<PieceProps>): void {
    // If this piece is active and the selected activeTile is not
    // the one this piece is standing on,
    // update the state to the selcetd tile,
    // thereby moving the piece to a different row and/or column
    if (
      prevProps.activePiece === this.props.id &&
      this.props.activeTile &&
      (this.props.activeTile[0] !== this.state.x ||
        this.props.activeTile[1] !== this.state.y)
    ) {
      this.setState({
        x: this.props.activeTile[0],
        y: this.props.activeTile[1],
      });
      this.toggleAvailableTilesForThisPiece(this.props.activeTile);
    }
  }
  render() {
    const toggleActivPiece = () => {
      this.props.setActivePiece(this.props.activePiece ? null : this.props.id);
    };

    return (
      <button
        onClick={() => {
          this.toggleAvailableTilesForThisPiece([this.state.x, this.state.y]);
          toggleActivPiece();
        }}
        className="absolute flex items-center justify-center w-12 h-12 "
        style={{
          left: `${(this.state.x - 1) * 48}px`,
          top: `${(this.state.y - 1) * 48}px`,
        }}
      >
        <Image
          src={`/pieces/${this.props.color}_${this.props.type}.png`}
          alt={`${this.props.color} ${this.props.type}`}
          width={25}
          height={25}
        />
      </button>
    );
  }
}
