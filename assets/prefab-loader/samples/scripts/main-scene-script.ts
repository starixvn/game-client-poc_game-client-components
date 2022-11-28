import { _decorator, Component, Node, Label, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass()
export class MainSceneScript extends Component {
  private prefabLabel!: Label;

  start() {}

  /**
   * name
   */
  public initPrefab(node: Node) {
    this.prefabLabel = node.getChildByName("test-label").getComponent(Label);
    node.active = true;
    if (this.prefabLabel) {
      this.prefabLabel.string = `Set in prefab script at ${new Date()}`;
    }
  }

  update(deltaTime: number) {}

  backToMain() {
    director.loadScene("main", (error: null | Error) => {
      error && console.log(error);
    });
  }
}
