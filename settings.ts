export const colours = ["black", "white"];
export const initialPieceColumns = {
  king: { col: [4], row: 1 },
  queen: { col: [5], row: 1 },
  bishop: { col: [3, 6], row: 1 },
  knight: { col: [2, 7], row: 1 },
  rook: { col: [1, 8], row: 1 },
  pawn: { col: [1, 2, 3, 4, 5, 6, 7, 8], row: 2 },
};

export const pieces: PieceMetaData[] = [];
colours.forEach((colour) => {
  Object.keys(initialPieceColumns).forEach((piece) => {
    initialPieceColumns[piece as keyof typeof initialPieceColumns].col.forEach(
      (col) => {
        const startingRow = colour === "white" ? 1 : 8;
        const row =
          piece === "pawn"
            ? colour === "white"
              ? startingRow + 1
              : startingRow - 1
            : startingRow;
        pieces.push({
          type: piece,
          colour,
          id: pieces.length,
          initialCoord: [col, row],
        });
      }
    );
    return;
  });
  return;
});
