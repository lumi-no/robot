
export const ROWS = 12;
export const COLS = 16;

export const START = 0;
export const FINISH = ROWS * COLS - 1;

// Пошук найкоротшого шляху
export function findPath(start, finish, obstacles) {
  const queue = [[start]];
  const visited = new Set([start]);

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];

  const blocked = new Set(obstacles);

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

    if (current === finish) {
      return path;
    }

    const row = Math.floor(current / COLS);
    const col = current % COLS;

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow < 0 ||
        newRow >= ROWS ||
        newCol < 0 ||
        newCol >= COLS
      ) {
        continue;
      }

      const next = newRow * COLS + newCol;

      if (blocked.has(next) || visited.has(next)) {
        continue;
      }

      visited.add(next);
      queue.push([...path, next]);
    }
  }

  // Якщо шлях не знайдено
  return [];
}

// Створення випадкових перешкод
export function generateObstacles(count, protectedCells = []) {
  const obstacles = new Set();
  const protectedSet = new Set([
    START,
    FINISH,
    ...protectedCells
  ]);

  const maximum = ROWS * COLS - protectedSet.size;
  const amount = Math.max(0, Math.min(count, maximum));

  while (obstacles.size < amount) {
    const randomCell = Math.floor(
      Math.random() * ROWS * COLS
    );

    if (!protectedSet.has(randomCell)) {
      obstacles.add(randomCell);
    }
  }

  return [...obstacles];
}
