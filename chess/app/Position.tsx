import Piece from "./Piece";

interface iGamePosition {
  [key: string]: object;
  white: {
    [key: string]: object;
    pawns: {
      a: [number, number];
      b: [number, number];
      c: [number, number];
      d: [number, number];
      e: [number, number];
      f: [number, number];
      g: [number, number];
      h: [number, number];
    };
    rooks: {
      a: [number, number];
      h: [number, number];
    };
    knights: {
      b: [number, number];
      g: [number, number];
    };
    bishops: {
      c: [number, number];
      f: [number, number];
    };
    queen: { d: [number, number] };
    king: { e: [number, number] };
  };
  black: {
    [key: string]: object;
    pawns: {
      a: [number, number];
      b: [number, number];
      c: [number, number];
      d: [number, number];
      e: [number, number];
      f: [number, number];
      g: [number, number];
      h: [number, number];
    };
    rooks: {
      a: [number, number];
      h: [number, number];
    };
    knights: {
      b: [number, number];
      g: [number, number];
    };
    bishops: {
      c: [number, number];
      f: [number, number];
    };
    queen: { d: [number, number] };
    king: { e: [number, number] };
  };
}

export default function Position() {
  const startingPosition: iGamePosition = {
    white: {
      pawns: {
        a: [1, 7],
        b: [2, 7],
        c: [3, 7],
        d: [4, 7],
        e: [5, 7],
        f: [6, 7],
        g: [7, 7],
        h: [8, 7],
      },
      rooks: {
        a: [1, 8],
        h: [8, 8],
      },
      knights: {
        b: [2, 8],
        g: [7, 8],
      },
      bishops: {
        c: [3, 8],
        f: [6, 8],
      },
      queen: { d: [4, 8] },
      king: { e: [5, 8] },
    },
    black: {
      pawns: {
        a: [1, 2],
        b: [2, 2],
        c: [3, 2],
        d: [4, 2],
        e: [5, 2],
        f: [6, 2],
        g: [7, 2],
        h: [8, 2],
      },
      rooks: {
        a: [1, 1],
        h: [8, 1],
      },
      knights: {
        b: [2, 1],
        g: [7, 1],
      },
      bishops: {
        c: [3, 1],
        f: [6, 1],
      },
      queen: { d: [4, 1] },
      king: { e: [5, 1] },
    },
  };
  return (
    <>
      {Object.keys(startingPosition).map((color) => {
        return Object.keys(startingPosition[color]).map((typeOfPiece) => {
          return Object.keys(startingPosition[color][typeOfPiece]);
        });
      })}
    </>
  );
}
