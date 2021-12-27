const main = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("could not get CanvasRenderingContext2D");
    return;
  }
  const board = new Board(ctx);
  setInterval(board.tick, 500);
};

window.onload = () => main();

type Cells = boolean[][];

type CellValue = 0 | 1;

class Matrix {
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

class Cell {
  constructor(public readonly vector: Vector, public value: CellValue) {}
}

class Vector {
  constructor(public x: number, public y: number) {}

  add(other: Vector) {
    return new Vector(this.x + other.x, this.y + other.y);
  }
}

class Board {
  constructor(private readonly _ctx: CanvasRenderingContext2D) {
    this._matrix = new Matrix(
      new Array(23).fill(null).map((_) => Array(14).fill(false))
    );
    const tetriminoClasses = [LTetromino, OTetromino];
    const tetriminoClass =
      tetriminoClasses[Math.floor(Math.random() * tetriminoClasses.length)];
    // const tetriminoClass = LTetromino;
    this.current = {
      tetromino: new tetriminoClass(),
      offset: new Vector(5, 0),
    };
  }

  private _matrix: Matrix;

  private current: { tetromino: Tetromino; offset: Vector };

  tick = () => {
    this.current.tetromino.posture.cells
      .filter((cell) => cell.value)
      .forEach((cell) => {
        this._matrix.at(this.current.offset.add(cell.vector)).value = 0;
      });

    this.current.offset.y += 1;

    this.current.tetromino.posture.cells
      .filter((cell) => cell.value)
      .forEach((cell) => {
        console.log(this.current.offset);
        console.log(cell.vector);
        this._matrix.at(this.current.offset.add(cell.vector)).value = 1;
      });
    this.draw();
  };

  private draw() {
    this._matrix.cells.forEach((cell) => {
      const vector = cell.vector.add(new Vector(-2, -3));
      console.log(cell.value);
      this._ctx.fillStyle = cell.value
        ? "rgba(0, 0, 0)"
        : "rgba(224, 224, 224)";
      this._ctx.fillRect(vector.x * 40 + 7, vector.y * 40 + 7, 26, 26);
    });
  }
}

abstract class Tetromino {
  constructor() {
    this.postures = this.getRawPostures().map(
      (raw_posture) => new Matrix(raw_posture)
    );
    this.posture = this.postures[0];
  }

  postures: Matrix[];
  posture: Matrix;

  abstract getRawPostures(): CellValue[][][];
}

class LTetromino extends Tetromino {
  getRawPostures(): CellValue[][][] {
    return [
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ];
  }
}

class OTetromino extends Tetromino {
  getRawPostures(): CellValue[][][] {
    return [
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
    ];
  }
}
