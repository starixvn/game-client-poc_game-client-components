import { DragonTailPosition } from "./dragon-tail-position";

export interface DragonTailBoardOptions {
  height: number;
}

interface DragonTailNode {
  positive: boolean;
  position: DragonTailPosition;
  index: number;
  isEndTail: boolean;
}

export class DragonTailBoard {
  private readonly minimumHeight: number = 2;
  private height: number;

  private nodes: { [key: string]: DragonTailNode } = {};
  private positivePosition: DragonTailPosition;
  private negativePosition: DragonTailPosition;
  private index: number;

  constructor(options: DragonTailBoardOptions) {
    this.height =
      options.height >= this.minimumHeight
        ? options.height
        : this.minimumHeight;

    //this.nodes = new Map<string, DragonTailNode>();

    this.positivePosition = DragonTailPosition.getInstance(0, 0);
    this.negativePosition = DragonTailPosition.getInstance(0, 0);

    this.index = 0;
  }

  getStatus(x: number, y: number): boolean | undefined {
    const position = DragonTailPosition.getInstance(x, y);
    const node = this.nodes[position.getName()];

    return node?.positive;
  }

  getIndex(x: number, y: number): number | undefined {
    const position = DragonTailPosition.getInstance(x, y);
    const node = this.nodes[position.getName()];

    return node?.index;
  }

  getPosition(index: number): number[] {
    const values = Object.values(this.nodes);
    const node = values.find((node) => node.index === index);

    return node ? [node.position.x, node.position.y] : [];
  }

  getHeight() {
    return this.height;
  }

  getWidth() {
    const keys = Object.keys(this.nodes);
    const maxX = Math.max(...keys.map((key) => Number(key.split("-")[0])));

    return maxX + 1;
  }

  setHeight(height: number) {
    if (this.height !== height && this.minimumHeight <= height) {
      this.height = height;

      const nodes = Object.values(this.nodes).sort((a, b) => a.index - b.index);
      const values = nodes.map((node) => node.positive);

      this.clear();

      const lengthGroups = values.length;
      for (let i = 0; i < lengthGroups; i++) {
        const isEndTail = values[i] != values[i + 1];
        this.addNode(values[i], isEndTail);
      }
    }
  }

  addNode(positive: boolean, isEndTail: boolean) {
    const node = {
      positive,
      position: positive ? this.positivePosition : this.negativePosition,
      index: this.index,
      isEndTail: isEndTail,
    };

    this.nodes[node.position.getName()] = node;
    this.updateNextPositions(node, positive);
  }

  size() {
    return this.index;
  }

  clear() {
    this.nodes = {};

    this.positivePosition = DragonTailPosition.getInstance(0, 0);
    this.negativePosition = DragonTailPosition.getInstance(0, 0);

    this.index = 0;
  }

  protected updateNextPositions(node: DragonTailNode, positive: boolean) {
    const positionKey = positive ? "positivePosition" : "negativePosition";
    const oppositePositionKey = positive
      ? "negativePosition"
      : "positivePosition";
    const nextPosition = this.getNextPosition(node);
    const innerWidth = this.getInnerWidth();
    const nextOppositePosition = DragonTailPosition.getInstance(innerWidth, 0);

    this[positionKey] = nextPosition;
    this[oppositePositionKey] = nextOppositePosition;
    this.index += 1;
  }

  protected getInnerWidth(): number {
    const keys = Object.keys(this.nodes);
    const firstRow = keys.filter(
      (key) => typeof key === "string" && key.match(/[0-9]*-0/)
    );
    const maxX = Math.max(...firstRow.map((key) => Number(key.split("-")[0])));

    return maxX + 1;
  }

  protected getNextPosition(current: DragonTailNode): DragonTailPosition {
    const bottom = current.position.getBottom();
    const right = current.position.getRight();
    const bottomLeft = bottom.getLeft();
    const isBottomValid = bottom.isValid(this.height);
    const isBottomEmpty = !this.nodes[bottom.getName()];
    const bottomLeftHasDifferenceValue =
      this.nodes[bottomLeft.getName()]?.positive !== current.positive;
    const endTailBottomLef = this.nodes[bottomLeft.getName()]?.isEndTail;
    const isBottomLefNotEndTail = endTailBottomLef === false;

    const combineCase = bottomLeftHasDifferenceValue || isBottomLefNotEndTail;

    if (isBottomValid && isBottomEmpty && combineCase) {
      return bottom;
    } else {
      return right;
    }
  }
}
