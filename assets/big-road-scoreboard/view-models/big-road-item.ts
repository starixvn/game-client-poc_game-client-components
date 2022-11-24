import * as cc from "cc";
import { BigRoadScoreboardPoint } from "./core/big-road-scoreboard";
import { Input } from "./implements/big-road-converter";

const { ccclass, menu } = cc._decorator;

export interface BigRoadItemOptions {
  padding?: number;
}

@ccclass
@menu("Scoreboard/BigRoadItem")
export class BigRoadItem extends cc.Component {
  private static renderEvent = "render";
  private static resetEvent = "reset";
  private static updateSizeEvent = "update-size";

  public createLayers(layerPrefabs: cc.Prefab[]) {
    layerPrefabs.forEach((prefab) =>
      this.node.addChild(cc.instantiate(prefab))
    );
  }

  public render(
    point: BigRoadScoreboardPoint<Input>,
    options?: BigRoadItemOptions
  ) {
    this.triggerEvent(BigRoadItem.renderEvent, point, options);
  }

  public reset() {
    this.triggerEvent(BigRoadItem.resetEvent);
  }

  public updateSize(size: number, options?: BigRoadItemOptions) {
    this.node
      .getComponent(cc.UITransform)
      ?.setContentSize(new cc.Size(size, size));
    this.triggerEvent(BigRoadItem.updateSizeEvent, size, options);
  }

  private triggerEvent(event: string, ...args: unknown[]) {
    this.node.children.forEach((node) => node.emit(event, ...args));
  }
}
