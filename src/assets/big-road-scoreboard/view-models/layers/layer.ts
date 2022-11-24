import * as cc from "cc";
import { BigRoadItemOptions } from "../big-road-item";
import { BigRoadScoreboardPoint } from "../core/big-road-scoreboard";
import { Input } from "../implements/big-road-converter";

const { ccclass, menu } = cc._decorator;

@ccclass
@menu("Scoreboard/Layers/Layer")
export default class Layer extends cc.Component {
  protected static renderEvent = "render";
  protected static resetEvent = "reset";
  protected static updateSizeEvent = "update-size";

  protected onLoad(): void {
    this.node.on(Layer.renderEvent, this.render, this);
    this.node.on(Layer.resetEvent, this.reset, this);
    this.node.on(Layer.updateSizeEvent, this.onUpdateSize, this);
    this.reset();
  }

  protected onDestroy(): void {
    this.node.off(Layer.renderEvent, this.render, this);
    this.node.off(Layer.resetEvent, this.reset, this);
    this.node.off(Layer.updateSizeEvent, this.onUpdateSize, this);
  }

  protected render(input: BigRoadScoreboardPoint<Input>) {
    this.node.active = !!input;
  }

  protected reset() {
    this.node.active = false;
  }

  protected onUpdateSize(size: number, options: BigRoadItemOptions) {
    this.node
      .getComponent(cc.UITransform)
      ?.setContentSize(
        new cc.Size(
          size - (options?.padding || 0),
          size - (options?.padding || 0)
        )
      );
  }
}
