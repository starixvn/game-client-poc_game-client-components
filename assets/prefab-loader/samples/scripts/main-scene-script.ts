import { _decorator, Component, Node, Label, director } from "cc";
const { ccclass, property } = _decorator;
import moment from "moment";

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
    this.schedule(() => {
      if (this.prefabLabel) {
        this.prefabLabel.string = `Set in prefab script at ${moment().format(
          "MMMM Do YYYY, h:mm:ss a"
        )}`;
      }
    });
  }

  update(deltaTime: number) {}

  backToMain() {
    director.loadScene("main", (error: null | Error) => {
      error && console.log(error);
    });
  }
}
