import * as cc from "cc";
import { BigRoadScoreboardPoint } from "../core/big-road-scoreboard";
import { Input } from "../implements/big-road-converter";
import Layer from "./layer";

const { ccclass, menu } = cc._decorator;

@ccclass
@menu("Scoreboard/Layers/InactiveLayer")
export default class InactiveLayer extends Layer {
  protected render(input: BigRoadScoreboardPoint<Input>) {
    this.node.active = input.status !== undefined && !input.status;
  }
}
