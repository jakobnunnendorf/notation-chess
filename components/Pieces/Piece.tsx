import Image from "next/image";
import { Component } from "react";
import { kingTiles } from "@/logic/availableTiles";

interface PieceProps {
  type: string;
  color: string;
  toggleAvailableTiles: (tiles: [number, number][]) => void;
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
  render() {
    return (
      <button
        onClick={() =>
          this.props.toggleAvailableTiles(kingTiles(this.state.x, this.state.y))
        }
        className="absolute flex items-center justify-center w-12 h-12 border border-red-400"
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
