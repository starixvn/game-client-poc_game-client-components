import * as cc from "cc";
import { BigRoadItemOptions } from "../big-road-item";
import { BigRoadScoreboardPoint } from "../core/big-road-scoreboard";
import { Input } from "../implements/big-road-converter";
import Layer from "./layer";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("Scoreboard/Layers/TieLayer")
export default class TieLayer extends Layer {
  @property(cc.Node)
  private icon!: cc.Node;

  @property(cc.Label)
  private label!: cc.Label;

  protected render(input: BigRoadScoreboardPoint<Input>) {
    const rounds =
      input.status !== undefined
        ? input.data.filter((result) => result?.metadata?.tie)
        : [];

    this.label.string = `${rounds.length}`;

    this.icon.active = rounds.length === 1;
    this.label.node.active = rounds.length > 1;
    this.node.active = !!rounds.length;
  }

  protected onUpdateSize(size: number, options: BigRoadItemOptions) {
    super.onUpdateSize(size, options);

    const tieSize = size * 0.5;

    this.label.fontSize = tieSize;
    this.icon
      .getComponent(cc.UITransform)
      ?.setContentSize(new cc.Size(tieSize, tieSize));
  }
}
