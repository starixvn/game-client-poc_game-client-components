import * as cc from "cc";
import Layer from "./layer";

const { ccclass, menu } = cc._decorator;

@ccclass
@menu("Scoreboard/Layers/BackgroundLayer")
export default class BackgroundLayer extends Layer {
  protected render() {
    this.node.active = true;
  }

  protected reset() {
    this.node.active = true;
  }

  protected onUpdateSize(size: number) {
    this.node
      .getComponent(cc.UITransform)
      ?.setContentSize(new cc.Size(size, size));
  }
}
