export function kingTiles(x: number, y: number): [number, number][] {
  const coordinates: [number, number][] = [];

  const isIllegal = (x: number, y: number) => {
    return x < 1 || x > 8 || y < 1 || y > 8;
  };

  for (let row = -1; row < 2; row++) {
    for (let col = -1; col < 2; col++) {
      // Skip the current position
      if (row === 0 && col === 0) continue;

      const newTile = [x + row, y + col];
      if (isIllegal(newTile[0], newTile[1])) continue;

      coordinates.push([x + row, y + col]);
    }
  }

  return coordinates;
}

console.log(kingTiles(1, 1));
