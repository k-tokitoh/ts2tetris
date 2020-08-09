import { AbsolutePosition, RelativePosition } from "./position";

const tRelativePositions = [
  new RelativePosition(0, 0),
  new RelativePosition(-1, 0),
  new RelativePosition(1, 0),
  new RelativePosition(0, 1),
];

class Tetrimino {
  centerPosition: AbsolutePosition = new AbsolutePosition(5, 15);
  occupiedRelativePositions: RelativePosition[];
  maxX: number;

  constructor(maxX) {
    this.occupiedRelativePositions = tRelativePositions;
    this.maxX = maxX;
  }

  occupiedAbsolutePositions() {
    return this.occupiedRelativePositions.map((relativePosition) =>
      this.centerPosition.getAbsolute(relativePosition)
    );
  }

  moveDown(): void {
    this.move(new RelativePosition(0, -1));
  }

  moveLeft(): void {
    this.move(new RelativePosition(-1, 0));
  }

  moveRight(): void {
    this.move(new RelativePosition(1, 0));
  }

  move(vector: RelativePosition): void {
    const nextCenterPosition = this.centerPosition.getAbsolute(vector);
    if (this.canMoveTo(nextCenterPosition)) {
      this.centerPosition = nextCenterPosition;
    }
  }

  canMoveTo(nextCenterPosition: AbsolutePosition): boolean {
    const nextAbosolutePositions = this.occupiedRelativePositions.map(
      (position) => nextCenterPosition.getAbsolute(position)
    );
    return this.canBeIn(nextAbosolutePositions);
  }

  rotateClockwise(): void {
    this.rotate((position) => new RelativePosition(position.y, -position.x));
  }

  rotateCounterClockwise(): void {
    this.rotate((position) => new RelativePosition(-position.y, position.x));
  }

  rotate(
    rotateFuction: (position: RelativePosition) => RelativePosition
  ): void {
    const nextRelativePositions = this.occupiedRelativePositions.map(
      rotateFuction
    );
    const nextAbsolutePositions = nextRelativePositions.map((position) =>
      this.centerPosition.getAbsolute(position)
    );
    if (this.canBeIn(nextAbsolutePositions)) {
      this.occupiedRelativePositions = nextRelativePositions;
    }
  }

  canBeIn(nextOccupiedAbsolutePositions: AbsolutePosition[]): boolean {
    return nextOccupiedAbsolutePositions.every(
      (position) =>
        0 <= position.x && position.x <= this.maxX && 0 <= position.y
    );
  }
}

export default Tetrimino;
