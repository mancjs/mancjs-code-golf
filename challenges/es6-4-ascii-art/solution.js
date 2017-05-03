const WIDTH = 64;
const HEIGHT = 64;

const grid = new Array(HEIGHT);

const init = () => {
  for (let y = 0; y < HEIGHT; y += 1) {
    grid[y] = new Array(WIDTH);

    for (let x = 0; x < WIDTH; x += 1) {
      grid[y][x] = '.';
    }
  }
};

const output = () => {
  let str = '';

  for (let y = 0; y < HEIGHT; y += 1) {
    const row = grid[y];

    for (let x = 0; x < WIDTH; x += 1) {
      str += row[x];
    }

    str += '\n';
  }

  return str.substring(0, str.length - 1);
};

const rect = (x, y, w, h) => {
  for (let xi = x; xi < x + w; xi += 1) {
    grid[y][xi] = '#';

    grid[y + h - 1][xi] = '#';
  }

  for (let yi = y; yi < y + h; yi += 1) {
    grid[yi][x] = '#';
    grid[yi][x + w - 1] = '#';
  }
};

var play = () => {
  init();

  rect(8, 8, 48, 48);
  rect(12, 12, 16, 16);
  rect(36, 12, 16, 16);
  rect(12, 40, 40, 12);

  return output();
};