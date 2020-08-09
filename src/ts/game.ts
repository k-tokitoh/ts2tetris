import Grid from "./grid";

class Game {
  elem: HTMLElement = document.createElement("div");
  grid: Grid = new Grid(this.elem);
  timerId: number;

  constructor(parentElem) {
    parentElem.appendChild(this.elem);
    this.setTimer();
    document.addEventListener("keydown", (e) => this.onKeyDown(e));
  }

  toggleTimer = () => {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    } else {
      this.setTimer();
    }
  };

  setTimer = () => {
    this.timerId = setInterval(() => {
      this.grid.tick();
    }, 100);
  };

  onKeyDown = (e: KeyboardEvent): void => {
    switch (e.key) {
      case "ArrowLeft":
        this.grid.moveTetriminoLeft();
        break;
      case "ArrowRight":
        this.grid.moveTetriminoRight();
        break;
      case "d":
        this.grid.rotateTetriminoClockwise();
        break;
      case "s":
        this.grid.rotateTetriminoCounterClockwise();
        break;
      case "p":
        this.toggleTimer();
        break;
    }
  };
}

export default Game;
