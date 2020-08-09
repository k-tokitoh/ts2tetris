class Position {
  x: number;
  y: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  down = (): Position => {
    return new Position(this.x, this.y - 1);
  };

  up = (): Position => {
    return new Position(this.x, this.y + 1);
  };

  right = (): Position => {
    return new Position(this.x + 1, this.y);
  };

  left = (): Position => {
    return new Position(this.x - 1, this.y);
  };

  equals = (opponent: Position): boolean => {
    return this.x === opponent.x && this.y === opponent.y;
  };
}

export default Position;
