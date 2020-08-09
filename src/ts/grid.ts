import Cell from "./cell";
import Tetrimino from "./tetrimino";
import Position from "./position";
import Area from "./area";

class Grid {
  area: Area = new Area(20, 10);
  elem: HTMLElement;
  cells: Cell[][];
  currentTetrimino: Tetrimino = new Tetrimino(this);
  sediment: Position[] = [];

  constructor(parentElem) {
    this.elem = this.initialElem(this.area);
    this.cells = this.initialCells(this.area);
    parentElem.appendChild(this.elem);
    this.draw();
  }

  initialElem = (area: Area): HTMLElement => {
    const elem = document.createElement("ul");
    elem.style.display = "grid";
    elem.style.gridTemplateColumns = `repeat(${area.width}, 32px)`;
    elem.style.gridTemplateRows = `repeat(${area.height}, 32px)`;
    elem.style.justifyItems = "center";
    elem.style.alignItems = "center";
    return elem;
  };

  initialCells = (area: Area): Cell[][] => {
    return Array(area.height)
      .fill(null)
      .map(() =>
        Array(area.width)
          .fill(null)
          .map(() => new Cell(this.elem))
      );
  };

  draw = (): void => {
    this.cells.forEach((cellsRow) => cellsRow.forEach((cell) => cell.clear()));
    this.currentTetrimino
      .occupiedPositions()
      .concat(this.sediment)
      .forEach((position) => {
        if (this.within(position)) {
          this.cells[this.area.height - 1 - position.y][position.x].fill();
        }
      });
  };

  tick = (): void => {
    if (!this.currentTetrimino.moveDown()) {
      this.sediment.push(...this.currentTetrimino.occupiedPositions());
      this.currentTetrimino = new Tetrimino(this);
    }
    this.draw();
  };

  occupiable = (position: Position): boolean => {
    return (
      this.within(position) &&
      this.sediment.every(
        (PieceOfSediment) => !PieceOfSediment.equals(position)
      )
    );
  };

  within = (position: Position): boolean => {
    return (
      0 <= position.x &&
      position.x <= this.area.width - 1 &&
      0 <= position.y &&
      position.y <= this.area.height - 1
    );
  };

  moveTetriminoLeft = () => {
    this.currentTetrimino.moveLeft();
  };

  moveTetriminoRight = () => {
    this.currentTetrimino.moveRight();
  };

  rotateTetriminoClockwise = () => {
    this.currentTetrimino.rotateClockwise();
  };

  rotateTetriminoCounterClockwise = () => {
    this.currentTetrimino.rotateCounterClockwise();
  };
}

export default Grid;
