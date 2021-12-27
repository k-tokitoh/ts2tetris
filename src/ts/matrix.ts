export type CellValue = 0 | 1;

export class Cell {
  constructor(public readonly vector: Vector, public value: CellValue) {}
}

export class Vector {
  constructor(public x: number, public y: number) {}

  add(other: Vector) {
    return new Vector(this.x + other.x, this.y + other.y);
  }
}

export class Matrix {
  constructor(cell_values: CellValue[][]) {
    this._cells = cell_values.map((row, y) =>
      row.map((value, x) => new Cell(new Vector(x, y), value))
    );
  }

  private _cells: Cell[][];

  get cells() {
    return this._cells.flat();
  }

  at(vector: Vector) {
    return this._cells[vector.y][vector.x];
  }
}
