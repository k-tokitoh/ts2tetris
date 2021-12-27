import { Matrix, Vector } from "./matrix";
import { Tetromino, LTetromino, OTetromino } from "./tetromino";

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

class Board {
  constructor(private readonly _ctx: CanvasRenderingContext2D) {
    this._backgroundLayer = this.getBaseMatrix();
    this._currentLayer = this.getBaseMatrix();
    this.current = this.resetCurrent();
    document.addEventListener("keydown", (e) => this.onKeyDown(e));
  }

  private _backgroundLayer: Matrix;
  private _currentLayer: Matrix;
  private current: { tetromino: Tetromino; offset: Vector };

  private getBaseMatrix = () =>
    new Matrix([
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      /////////////  VISIBLE BELOW  /////////////
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);

  private resetCurrent() {
    const tetrominoClasses = [LTetromino, OTetromino];
    const tetrominoClass =
      tetrominoClasses[Math.floor(Math.random() * tetrominoClasses.length)];
    // const tetrominoClass = LTetromino;
    return {
      tetromino: new tetrominoClass(),
      offset: new Vector(5, 0),
    };
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    const vector = (() => {
      switch (e.key) {
        case "ArrowRight":
          return new Vector(1, 0);
        case "ArrowLeft":
          return new Vector(-1, 0);
      }
    })();
    if (!vector) return;
    this.move({ vector: vector });
    this.draw();
  };

  tick = () => {
    this.move({
      vector: new Vector(0, 1),
      onCollision: () => {
        this._currentLayer.cells
          .filter((cell) => cell.value)
          .forEach((cell) => (this._backgroundLayer.at(cell.vector).value = 1));
        this._currentLayer = this.getBaseMatrix();
        this.current = this.resetCurrent();
      },
    });
    this.draw();
  };

  private move({
    vector,
    onCollision = () => {},
  }: {
    vector: Vector;
    onCollision?: () => void;
  }) {
    if (this.collisionDetected(vector)) {
      onCollision();
      return;
    }

    this.current.tetromino.posture.cells
      .filter((cell) => cell.value)
      .forEach((cell) => {
        this._currentLayer.at(this.current.offset.add(cell.vector)).value = 0;
      });

    this.current.offset = this.current.offset.add(vector);

    this.current.tetromino.posture.cells
      .filter((cell) => cell.value)
      .forEach((cell) => {
        this._currentLayer.at(this.current.offset.add(cell.vector)).value = 1;
      });
  }

  private collisionDetected(vector: Vector) {
    return this.current.tetromino.posture.cells
      .filter((cell) => cell.value)
      .some(
        (cell) =>
          this._backgroundLayer.at(
            this.current.offset.add(cell.vector).add(vector)
          ).value
      );
  }

  private draw() {
    this._backgroundLayer.cells.forEach((backgroundCell) => {
      const currentCell = this._currentLayer.at(backgroundCell.vector);
      const vector = backgroundCell.vector.add(new Vector(-2, -3));
      this._ctx.fillStyle =
        backgroundCell.value || currentCell.value
          ? "rgba(0, 0, 0)"
          : "rgba(224, 224, 224)";
      this._ctx.fillRect(vector.x * 40 + 7, vector.y * 40 + 7, 26, 26);
    });
  }
}
