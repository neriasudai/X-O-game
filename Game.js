const SIZE = 3;

export default class Game {
  turn = "x";

  board = Array(SIZE)
    .fill(null)
    .map(() =>
      Array(SIZE)
        .fill(null)
        .map(() => ({ value: null, win: false }))
    );

  load() {
    const game = localStorage.getItem("game");
    if (game) {
      const { board, turn } = JSON.parse(game);
      this.turn = turn;
      this.board = board;
    }
  }
  save() {
    const game = JSON.stringify({
      turn: this.turn,
      board: this.board,
    });
    localStorage.setItem("game", game);
  }

  play(x, y) {
    const cell = this.board[x][y];
    cell.value = this.turn;
    this.turn = this.turn === "x" ? "o" : "x";
    this.checkWin("o");
    this.checkWin("x");
    this.save();
  }

  isGameOver() {
    return (
      this.board.every((row) => row.every((c) => c.value != null)) ||
      this.board.some((row) => row.some((c) => c.win))
    );
  }
  checkWin(player) {
    const board = this.board;
    const array = Array(SIZE).fill(null);
    for (let x = 0; x < SIZE; x++) {
      if (array.every((_, idx) => board[x][idx].value === player)) {
        array.forEach((_, idx) => (board[x][idx].win = true));
      }

      if (array.every((_, idx) => board[idx][x].value === player)) {
        array.forEach((_, idx) => (board[idx][x].win = true));
      }
    }

    if (array.every((_, idx) => board[idx][idx].value === player)) {
      array.forEach((_, idx) => (board[idx][idx].win = true));
    }

    if (array.every((_, idx) => board[idx][SIZE - 1 - idx].value === player)) {
      array.forEach((_, idx) => (board[idx][SIZE - 1 - idx].win = true));
    }
  }
}

let g = new Game();
console.log(g);
