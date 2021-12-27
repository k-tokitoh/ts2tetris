import { CellValue, Matrix } from "./matrix";

export abstract class Tetromino {
  constructor() {
    this.postures = this.getRawPostures().map(
      (raw_posture) => new Matrix(raw_posture)
    );
    this.postureIndex = 0;
  }

  private postures: Matrix[];
  private postureIndex: number;

  get posture() {
    return this.postures[this.postureIndex];
  }

  abstract getRawPostures(): CellValue[][][];

  rotate(indexDiff: number = 1) {
    this.postureIndex =
      (this.postureIndex + indexDiff + this.postures.length) %
      this.postures.length;
  }
}

export class LTetromino extends Tetromino {
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

export class OTetromino extends Tetromino {
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
