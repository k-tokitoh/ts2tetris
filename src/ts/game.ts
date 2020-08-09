import Grid from "./grid";

class Game {
  elem: HTMLElement = document.createElement("div");
  grid: Grid = new Grid(this.elem);

  constructor(parentElem) {
    parentElem.appendChild(this.elem);

    setInterval(() => {
      this.grid.tick();
    }, 500);
  }
}

export default Game;
