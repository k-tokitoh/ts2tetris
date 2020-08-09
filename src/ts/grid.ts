import Cell from "./cell";
import Tetrimino from "./tetrimino";

class Grid {
  static HEIGHT = 20;
  static WIDTH = 10;

  elem: HTMLElement = this.initialElem();
  cells: Cell[][] = this.initialCells();
  currentTetrimino: Tetrimino = new Tetrimino(Grid.WIDTH - 1);

  constructor(parentElem) {
    parentElem.appendChild(this.elem);
    this.draw();
    document.addEventListener("keydown", (e) => this.onKeyDown(e));
  }

  initialElem(): HTMLElement {
    const elem = document.createElement("ul");
    elem.style.display = "grid";
    elem.style.gridTemplateColumns = `repeat(${Grid.WIDTH}, 32px)`;
    elem.style.gridTemplateRows = `repeat(${Grid.HEIGHT}, 32px)`;
    elem.style.justifyItems = "center";
    elem.style.alignItems = "center";
    return elem;
  }

  initialCells(): Cell[][] {
    return Array(Grid.HEIGHT)
      .fill(null)
      .map(() =>
        Array(Grid.WIDTH)
          .fill(null)
          .map(() => new Cell(this.elem))
      );
  }

  draw() {
    this.cells.forEach((cellsRow) => cellsRow.forEach((cell) => cell.clear()));
    this.currentTetrimino
      .occupiedAbsolutePositions()
      .forEach((position) =>
        this.cells[Grid.HEIGHT - 1 - position.y][position.x].fill()
      );
  }

  tick(): void {
    this.currentTetrimino.moveDown();
    this.draw();
  }

  onKeyDown(e: KeyboardEvent): void {
    switch (e.key) {
      case "ArrowLeft":
        this.currentTetrimino.moveLeft();
        this.draw();
        break;
      case "ArrowRight":
        this.currentTetrimino.moveRight();
        this.draw();
        break;
      case "d":
        this.currentTetrimino.rotateClockwise();
        this.draw();
        break;
      case "s":
        this.currentTetrimino.rotateCounterClockwise();
        this.draw();
        break;
    }
  }
}

export default Grid;
