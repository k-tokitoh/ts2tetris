class Position {
  x: number;
  y: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class AbsolutePosition extends Position {
  getAbsolute(relativePosition: RelativePosition) {
    return new AbsolutePosition(
      this.x + relativePosition.x,
      this.y + relativePosition.y
    );
  }
}

export class RelativePosition extends Position {}
