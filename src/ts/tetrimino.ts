import Position from "./position";
import Grid from "./grid";

type Pattern = number[][];

type Shape = {
  patterns: Pattern[];
};

const shapeT: Shape = {
  patterns: [
    [
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 1, 1, 1],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 0, 1, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
    ],
  ],
};

const shapeI: Shape = {
  patterns: [
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
  ],
};

const shapeO: Shape = {
  patterns: [
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
  ],
};

const shapeS: Shape = {
  patterns: [
    [
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
    ],
  ],
};

const shapeZ: Shape = {
  patterns: [
    [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
    ],
  ],
};

const shapeL: Shape = {
  patterns: [
    [
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
  ],
};

const shapeJ: Shape = {
  patterns: [
    [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 1],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 1, 1],
      [0, 0, 0, 0],
    ],
  ],
};

const shapes = [shapeT, shapeI, shapeO, shapeZ, shapeS, shapeL, shapeJ];

class Tetrimino {
  position: Position;
  patternIndex: number = 0;
  grid: Grid;
  shape: Shape;

  constructor(grid) {
    this.shape = shapes[Math.floor(Math.random() * shapes.length)];
    this.position = new Position(
      (grid.area.width - this.shape.patterns[0].length) / 2,
      grid.area.height - this.shape.patterns[0].length / 2
    );
    this.grid = grid;
  }

  currentPattern = (): Pattern => {
    return this.shape.patterns[this.patternIndex];
  };

  occupiedPositions = (): Position[] => {
    const positions: Position[] = [];
    this.currentPattern().forEach((row, i) =>
      row.forEach((cell, j) => {
        if (cell == 1)
          positions.push(
            new Position(this.position.x + j, this.position.y + (3 - i))
          );
      })
    );
    return positions;
  };

  moveDown = (): boolean => {
    return this.move(
      () => (this.position = this.position.down()),
      () => (this.position = this.position.up())
    );
  };

  moveRight = (): boolean => {
    return this.move(
      () => (this.position = this.position.right()),
      () => (this.position = this.position.left())
    );
  };

  moveLeft = (): boolean => {
    return this.move(
      () => (this.position = this.position.left()),
      () => (this.position = this.position.right())
    );
  };

  rotateClockwise = (): boolean => {
    return this.move(this.incrementPatternIndex, this.decrementPatternIndex);
  };

  rotateCounterClockwise = (): boolean => {
    return this.move(this.decrementPatternIndex, this.incrementPatternIndex);
  };

  incrementPatternIndex = (): void => {
    this.patternIndex = (this.patternIndex + 1) % this.shape.patterns.length;
  };

  decrementPatternIndex = (): void => {
    this.patternIndex =
      (this.patternIndex + this.shape.patterns.length - 1) %
      this.shape.patterns.length;
  };

  move = (attempt: () => void, reset: () => void): boolean => {
    attempt();
    if (!this.canBeIn(this.occupiedPositions())) {
      reset();
      return false;
    }
    return true;
  };

  canBeIn = (positions: Position[]): boolean => {
    return positions.every(this.grid.occupiable);
  };
}

export default Tetrimino;
