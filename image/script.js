const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const COLS = 10;
const ROWS = 20;
const BLOCK = canvas.width / COLS;

let board = Array.from({ length: ROWS }, () =>
  Array(COLS).fill(0)
);

let piece = {
  x: 3,
  y: 0,
  shape: [
    [1, 1, 1],
    [0, 1, 0]
  ]
};

function drawBlock(x, y, color = "hotpink") {
  ctx.fillStyle = color;
  ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
  ctx.strokeStyle = "white";
  ctx.strokeRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (board[y][x]) drawBlock(x, y);
    }
  }

  piece.shape.forEach((row, dy) => {
    row.forEach((value, dx) => {
      if (value) drawBlock(piece.x + dx, piece.y + dy, "violet");
    });
  });
}

function drop() {
  piece.y++;
  if (collision()) {
    piece.y--;
    merge();
    piece = {
      x: 3,
      y: 0,
      shape: [
        [1, 1, 1],
        [0, 1, 0]
      ]
    };
  }
  drawBoard();
}

function collision() {
  return piece.shape.some((row, dy) =>
    row.some((value, dx) => {
      let x = piece.x + dx;
      let y = piece.y + dy;
      return (
        value &&
        (y >= ROWS ||
         x < 0 ||
         x >= COLS ||
         board[y][x])
      );
    })
  );
}

function merge() {
  piece.shape.forEach((row, dy) => {
    row.forEach((value, dx) => {
      if (value) {
        board[piece.y + dy][piece.x + dx] = 1;
      }
    });
  });
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") piece.x--;
  if (e.key === "ArrowRight") piece.x++;
  if (e.key === "ArrowDown") drop();
  drawBoard();
});

setInterval(drop, 800);
drawBoard();