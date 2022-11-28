import * as cc from "cc";
const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("Components/PrefabLoader")
export default class PrefabLoader extends cc.Component {
  @property(cc.Prefab)
  private prefab: cc.Prefab = null;

  @property([cc.Component.EventHandler])
  private initializationEventHandlers: cc.EventHandler[] = [];

  private instance: cc.Node;

  protected onLoad() {
    this.instance = cc.instantiate(this.prefab);
  }

  protected start() {
    this.initialize();
  }

  private initialize() {
    if (this.prefab) {
      this.initializationEventHandlers.forEach((event) =>
        event.emit([this.instance])
      );

      this.node.addChild(this.instance);
    }
  }
}
