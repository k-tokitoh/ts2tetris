import { Matrix, Vector } from "./matrix";
import { Tetromino, LTetromino, OTetromino } from "./tetromino";
import cloneDeep from "lodash/cloneDeep";

const main = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("could not get CanvasRenderingContext2D");
    return;
  }
  const board = new Board(ctx);
  setInterval(board.tick, 300);
};

window.onload = () => main();

class Hand {
  constructor() {
    const tetrominoClasses = [LTetromino, OTetromino];
    const tetrominoClass =
      tetrominoClasses[Math.floor(Math.random() * tetrominoClasses.length)];
    this.tetromino = new tetrominoClass();
    this.offset = new Vector(5, 0);
  }
  tetromino: Tetromino;
  offset: Vector;
}

class Board {
  constructor(private readonly _ctx: CanvasRenderingContext2D) {
    this._backgroundLayer = this.getBaseMatrix();
    this.currentHand = new Hand();
    this.aheadHand = cloneDeep(this.currentHand);
    document.addEventListener("keydown", (e) => this.onKeyDown(e));
  }

  private _backgroundLayer: Matrix;
  private currentHand: Hand;
  private aheadHand: Hand;

  // TODO: cache
  private get _currentLayer(): Matrix {
    const matrix = this.getBaseMatrix();
    this.currentHand.tetromino.posture.cells
      .filter((cell) => cell.value)
      .forEach(
        (cell) =>
          (matrix.at(cell.vector.add(this.currentHand.offset)).value = 1)
      );
    return matrix;
  }

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

  private onKeyDown = (e: KeyboardEvent): void => {
    this.moveByKey(e.key) && this.draw();
  };

  private moveByKey(key: string) {
    switch (key) {
      case "ArrowRight":
        return this.moveOffset({
          forward: new Vector(1, 0),
          backward: new Vector(-1, 0),
        });
      case "ArrowLeft":
        return this.moveOffset({
          forward: new Vector(-1, 0),
          backward: new Vector(1, 0),
        });
      case "ArrowUp":
        return this.move({
          forward: (hand) => hand.tetromino.rotate(1),
          backward: (hand) => hand.tetromino.rotate(-1),
        });
      default:
        return false;
    }
  }

  moveOffset(vectors: { forward: Vector; backward: Vector }) {
    return this.move({
      forward: (hand) => (hand.offset = hand.offset.add(vectors.forward)),
      backward: (hand) => (hand.offset = hand.offset.add(vectors.backward)),
    });
  }

  tick = () => {
    this.move({
      forward: (hand) => (hand.offset = hand.offset.add(new Vector(0, 1))),
      backward: (hand) => (hand.offset = hand.offset.add(new Vector(0, -1))),
      onCollision: () => {
        this._currentLayer.cells
          .filter((cell) => cell.value)
          .forEach((cell) => (this._backgroundLayer.at(cell.vector).value = 1));
        this.currentHand = new Hand();
        this.aheadHand = cloneDeep(this.currentHand);
      },
    });
    this.draw();
  };

  private move({
    forward,
    backward,
    onCollision = () => {},
  }: {
    forward: (hand: Hand) => void;
    backward: (hand: Hand) => void;
    onCollision?: () => void;
  }) {
    forward(this.aheadHand);
    if (this.collisionDetected()) {
      backward(this.aheadHand);
      onCollision();
      return false;
    }

    forward(this.currentHand);
    return true;
  }

  private collisionDetected() {
    return this.aheadHand.tetromino.posture.cells
      .filter((cell) => cell.value)
      .some(
        (cell) =>
          this._backgroundLayer.at(this.aheadHand.offset.add(cell.vector)).value
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
