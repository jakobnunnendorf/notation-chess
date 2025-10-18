export function pawnTiles(
  x: number,
  y: number,
  colour: string
): [number, number][] {
  const firstTile: [number, number] = [x, colour === "white" ? y + 1 : y - 1];
  const tiles = [firstTile];
  if ((colour === "white" && y === 2) || (colour === "black" && y === 7)) {
    const secondTile: [number, number] = [
      x,
      colour === "white" ? y + 2 : y - 2,
    ];
    tiles.push(secondTile);
  }
  return tiles;
}

export function rookTiles(
  x: number,
  y: number,
  pos: [number, number]
): [number, number][] {
  const coordinates: [number, number][] = [];

  const isLegal = (x: number, y: number) => {
    return 0 < x || x < 9 || 0 < y || 9 < y;
  };

  for (let col = 1; col < 9; col++) {
    // Skip the current position
    if (col === pos[0] && y === pos[1]) continue;

    if (isLegal(col, y)) {
      coordinates.push([col, y]);
    }
  }
  for (let row = 1; row < 9; row++) {
    // Skip the current position
    if (x === pos[0] && row === pos[1]) continue;

    if (isLegal(x, row)) {
      coordinates.push([x, row]);
    }
  }

  return coordinates;
}

export function kingTiles(x: number, y: number): [number, number][] {
  const coordinates: [number, number][] = [];

  const isLegal = (x: number, y: number) => {
    return 1 < x || x < 9 || 1 < y || y > 9;
  };

  for (let row = -1; row < 2; row++) {
    for (let col = -1; col < 2; col++) {
      // Skip the current position
      if (row === 0 && col === 0) continue;

      const newTile = [x + row, y + col];
      if (isLegal(newTile[0], newTile[1])) coordinates.push([x + row, y + col]);
    }
  }

  return coordinates;
}
