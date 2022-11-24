import { IConverter } from "./converter";
import { DragonTailBoard } from "./dragon-tail/dragon-tail-board";
import {
  GoodRoad,
  IGoodRoadDetector,
} from "./good-road-detection/good-road-detector";

export interface BigRoadScoreboardOptions<T> {
  height: number;
  converter: IConverter<T>;
  goodRoadDetectors: IGoodRoadDetector[];
}

export interface BigRoadScoreboardPoint<T> {
  x: number;
  y: number;
  status: boolean | undefined;
  data: T[];
}

export class BigRoadScoreboard<InputType> {
  private readonly dragonTailBoard: DragonTailBoard;
  private readonly converter: IConverter<InputType>;
  private readonly goodRoadDetectors: IGoodRoadDetector[];

  private input: InputType[];
  private groups: boolean[];

  constructor(options: BigRoadScoreboardOptions<InputType>) {
    this.dragonTailBoard = new DragonTailBoard(options);
    this.converter = options.converter;
    this.goodRoadDetectors = options.goodRoadDetectors;
    this.input = [];
    this.groups = [];
  }

  initialize(input: InputType[]): void {
    this.input = input;
    this.loadDragonTailBoard();
  }

  fifo(record: InputType): void {
    if (this.input.length) {
      this.input.shift();
      this.input.push(record);
      this.loadDragonTailBoard();
    }
  }

  getGoodRoad(): GoodRoad {
    return this.goodRoadDetectors.reduce((goodRoad, detector) => {
      if (!this.isValidGoodRoad(goodRoad)) {
        goodRoad = detector.detect(this.groups, this.dragonTailBoard);
      }

      return goodRoad;
    }, {} as GoodRoad);
  }

  width(): number {
    return this.dragonTailBoard.getWidth();
  }

  height(): number {
    return this.dragonTailBoard.getHeight();
  }

  traverse(visit: (point: BigRoadScoreboardPoint<InputType>) => void) {
    const groups = this.converter.group(this.input);
    const width = this.width();
    const height = this.height();

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const point = this.getPoint(groups, x, y);

        visit(point);
      }
    }
  }

  private getPoint(
    groups: InputType[][],
    x: number,
    y: number
  ): BigRoadScoreboardPoint<InputType> {
    const status = this.dragonTailBoard.getStatus(x, y);
    const index = this.dragonTailBoard.getIndex(x, y);
    const data = index !== undefined ? groups[index] : [];

    return { data, x, y, status };
  }

  private loadDragonTailBoard(): void {
    const groups = this.converter.group(this.input);

    this.groups = groups.map((group) => this.converter.convert(group));

    this.dragonTailBoard.clear();

    const lengthGroups = this.groups.length;
    for (let i = 0; i < lengthGroups; i++) {
      const isEndTail = this.groups[i] != this.groups[i + 1];
      this.dragonTailBoard.addNode(this.groups[i], isEndTail);
    }
  }

  private isValidGoodRoad(goodRoad: GoodRoad) {
    return (
      goodRoad && goodRoad.x >= 0 && goodRoad.height >= 1 && goodRoad.width >= 1
    );
  }
}
