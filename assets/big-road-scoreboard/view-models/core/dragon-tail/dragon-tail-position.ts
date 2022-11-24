export interface DragonTailPositionOptions {
  x: number;
  y: number;
}

export class DragonTailPosition {
  public readonly x: number;
  public readonly y: number;

  constructor(options: DragonTailPositionOptions) {
    this.x = options.x;
    this.y = options.y;
  }

  static getInstance(x: number, y: number) {
    return new DragonTailPosition({ x, y });
  }

  getName(): string {
    return `${this.x}-${this.y}`;
  }

  getBottom(): DragonTailPosition {
    return new DragonTailPosition({ x: this.x, y: this.y + 1 });
  }

  getRight(): DragonTailPosition {
    return new DragonTailPosition({ x: this.x + 1, y: this.y });
  }

  getLeft(): DragonTailPosition {
    return new DragonTailPosition({ x: this.x - 1, y: this.y });
  }

  isValid(height: number) {
    return this.x >= 0 && this.y < height;
  }
}
