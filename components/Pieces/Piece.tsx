import Image from "next/image";
import { Component } from "react";
import { kingTiles } from "@/logic/availableTiles";

interface PieceProps {
  id: number;
  type: string;
  color: string;
  toggleAvailableTiles: (tiles: [number, number][]) => void;
  activeTile: [number, number] | null;
  activePiece: number | null;
  setActivePiece: (piece: number | null) => void;
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
      x: 1,
      y: 4,
    };
  }

  componentDidUpdate(
    prevProps: Readonly<PieceProps>,
    prevState: Readonly<PieceState>,
    snapshot?: any
  ): void {
    // If this piece is active and of the right colour,
    // and the selected activeTile is not the one this piece is standing on,
    // update the state to the selcetd tile,
    // thereby moving the piece to a different row or column
    console.log(prevProps);
    console.log(this.props);
    console.log(prevState);
    console.log(this.state);
    console.log(this.props.activePiece === this.props.id);
    console.log(
      prevProps.activeTile &&
        this.props.activeTile &&
        (prevProps.activeTile[0] !== this.props.activeTile[0] ||
          prevProps.activeTile[1] !== this.props.activeTile[1])
    );
    if (
      prevProps.activePiece === this.props.id &&
      prevProps.activeTile &&
      this.props.activeTile &&
      (prevProps.activeTile![0] !== this.props.activeTile[0] ||
        prevProps.activeTile![1] !== this.props.activeTile[1])
    ) {
      this.setState({
        x: this.props.activeTile[0],
        y: this.props.activeTile[1],
      });
      this.props.toggleAvailableTiles(
        kingTiles(this.props.activeTile[0], this.props.activeTile[1])
      );
    }
  }
  render() {
    console.log("Hello world!");
    return (
      <button
        onClick={() => {
          this.props.toggleAvailableTiles(
            kingTiles(this.state.x, this.state.y)
          );
          this.props.setActivePiece(this.props.id);
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
