import { CellValue, Matrix } from "./matrix";

export abstract class Tetromino {
  constructor() {
    this.postures = this.getRawPostures().map(
      (raw_posture) => new Matrix(raw_posture)
    );
    this.posture = this.postures[0];
  }

  private postures: Matrix[];
  posture: Matrix;

  abstract getRawPostures(): CellValue[][][];
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
