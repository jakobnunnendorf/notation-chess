export function kingTiles(x: number, y: number): [number, number][] {
  const coordinates: [number, number][] = [];

  const iLlegal = (x: number, y: number) => {
    return 1 < x || x < 9 || 1 < y || y > 9;
  };

  for (let row = -1; row < 2; row++) {
    for (let col = -1; col < 2; col++) {
      // Skip the current position
      if (row === 0 && col === 0) continue;

      const newTile = [x + row, y + col];
      if (iLlegal(newTile[0], newTile[1])) coordinates.push([x + row, y + col]);
    }
  }

  return coordinates;
}

console.log(kingTiles(1, 1));
