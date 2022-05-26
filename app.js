import Game from "./Game.js";

function draw(game) {
  const appEl = document.querySelector(".board");
  appEl.innerHTML = "";

  const gameOver = game.isGameOver();
  game.board.forEach((row, x) => {
    const rowEl = document.createElement("div");
    rowEl.classList.add("row");
    appEl.appendChild(rowEl);
    row.forEach((col, y) => {
      const colEl = document.createElement("div");
      colEl.classList.add("col");
      if (col.value == "x") colEl.classList.add("player1");
      else if (col.value == "o") colEl.classList.add("player2");
      if (col.win) colEl.classList.add("win");

      colEl.innerHTML = col.value;
      rowEl.appendChild(colEl);
      if (col.value == null && !gameOver)
        colEl.addEventListener("click", () => {
          game.play(x, y);
          draw(game);
        });
    });
  });

  if (gameOver) {
    const btnEl = document.createElement("button");
    btnEl.innerHTML = "משחק חדש";
    btnEl.addEventListener("click", () => {
      const game = new Game();
      game.save();
      draw(game);
    });
    appEl.appendChild(btnEl);
  }
}

window.onload = () => {
  const game = new Game();
  game.load();
  draw(game);
};
