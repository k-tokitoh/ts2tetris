import { AbsolutePosition, RelativePosition } from "./position";

const tRelativePositions = [
  new RelativePosition(0, 0),
  new RelativePosition(-1, 0),
  new RelativePosition(1, 0),
  new RelativePosition(0, 1),
];

class Tetrimino {
  centerPosition: AbsolutePosition;
  occupiedRelativePositions: RelativePosition[];

  constructor() {
    this.centerPosition = new AbsolutePosition(5, 15);
    this.occupiedRelativePositions = tRelativePositions;
  }

  occupiedAbsolutePositions() {
    return this.occupiedRelativePositions.map((relativePosition) =>
      this.centerPosition.getAbsolute(relativePosition)
    );
  }

  moveDown() {
    if (!this.canMoveDown()) return;
    this.centerPosition.y -= 1;
  }

  canMoveDown() {
    return this.occupiedAbsolutePositions().every(
      (occupiedAbsolutePosition) => 0 < occupiedAbsolutePosition.y
    );
  }
}

export default Tetrimino;
