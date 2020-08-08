import Cell from "./cell";
import Tetrimino from "./tetrimino";

class Grid {
  static HEIGHT = 20;
  static WIDTH = 10;

  elem: HTMLElement;
  cells: Cell[][];
  currentTetrimino: Tetrimino;

  constructor(parentElem) {
    this.elem = document.createElement("ul");
    parentElem.appendChild(this.elem);
    this.setInitialStyles();
    this.setCells();
    this.currentTetrimino = new Tetrimino();
    this.draw();
  }

  setCells() {
    this.cells = Array(Grid.HEIGHT)
      .fill(null)
      .map(() =>
        Array(Grid.WIDTH)
          .fill(null)
          .map(() => new Cell(this.elem))
      );
  }

  setInitialStyles() {
    this.elem.style.display = "grid";
    this.elem.style.gridTemplateColumns = `repeat(${Grid.WIDTH}, 32px)`;
    this.elem.style.gridTemplateRows = `repeat(${Grid.HEIGHT}, 32px)`;
    this.elem.style.justifyItems = "center";
    this.elem.style.alignItems = "center";
  }

  draw() {
    this.cells.forEach((cellsRow) => cellsRow.forEach((cell) => cell.clear()));
    this.currentTetrimino
      .occupiedAbsolutePositions()
      .forEach((position) =>
        this.cells[Grid.HEIGHT - 1 - position.y][position.x].fill()
      );
  }

  tick() {
    this.currentTetrimino.moveDown();
    this.draw();
  }
}

export default Grid;
