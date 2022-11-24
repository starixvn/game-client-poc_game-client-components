import * as cc from "cc";
import { BigRoadScoreboardPoint } from "../core/big-road-scoreboard";
import { Input } from "../implements/big-road-converter";
import Layer from "./layer";

const { ccclass, menu } = cc._decorator;

@ccclass
@menu("Scoreboard/Layers/ActiveLayer")
export default class ActiveLayer extends Layer {
  protected render(input: BigRoadScoreboardPoint<Input>) {
    this.node.active = !!input.status;
  }
}
