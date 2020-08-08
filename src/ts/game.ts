import Grid from "./grid";

class Game {
  elem: HTMLElement;
  grid: Grid;

  constructor(parentElem) {
    this.elem = document.createElement("div");
    parentElem.appendChild(this.elem);

    this.grid = new Grid(this.elem);

    setInterval(() => {
      this.grid.tick();
    }, 500);
  }
}

export default Game;
