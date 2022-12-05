import * as cc from "cc";
const { ccclass } = cc._decorator;

@ccclass
export default class Movement extends cc.Component {
  private touchOffset: cc.Vec2;

  protected onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.eventStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this);
  }

  protected onDestroy() {
    this.node.off(cc.Node.EventType.TOUCH_START, this.eventStart, this);
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this);
  }

  private eventStart(event: cc.EventTouch) {
    this.touchOffset = cc.v2(
      event.touch.getLocationX() - this.node.position.x,
      event.touch.getLocationY() - this.node.position.y
    );

    this.node.parent.insertChild(
      this.node,
      this.node.parent.children.length - 1
    );
  }

  private eventMove(event: cc.EventTouch) {
    const x = event.touch.getLocationX() - this.touchOffset.x;
    const y = event.touch.getLocationY() - this.touchOffset.y;

    this.node.setPosition(x, y);
  }
}
