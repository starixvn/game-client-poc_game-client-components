import { DragonTailBoard } from "../dragon-tail/dragon-tail-board";

export interface GoodRoad {
  x: number;
  width: number;
  height: number;
}

export interface IGoodRoadDetector {
  detect(input: boolean[], board: DragonTailBoard): GoodRoad;
}
