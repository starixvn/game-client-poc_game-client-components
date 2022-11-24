import * as cc from "cc";
import { BigRoadItem } from "./big-road-item";
import {
  BigRoadScoreboard,
  BigRoadScoreboardPoint,
} from "./core/big-road-scoreboard";
import { Input } from "./implements/big-road-converter";
import { BigRoadCreator } from "./implements/big-road-creator";

const { ccclass, property, menu } = cc._decorator;

export interface BigRoadOptions {
  layers?: cc.Prefab[];
  background?: cc.SpriteFrame;
  padding?: number;
  item?: {
    padding?: number;
  };
}

@ccclass
@menu("Scoreboard/BigRoad")
export class BigRoad extends cc.Component {
  @property(cc.Node)
  public content!: cc.Node;

  @property(cc.Prefab)
  private itemPrefab!: cc.Prefab;

  @property([cc.Prefab])
  private defaultLayerPrefabs: cc.Prefab[] = [];

  @property(cc.Sprite)
  private background!: cc.Sprite;

  private height = 6;
  private scoreboard: BigRoadScoreboard<Input> | null = null;
  private itemLayerPrefabs: cc.Prefab[] = [];
  private contentLayout: cc.Layout | null = null;
  private scrollView: cc.ScrollView | null = null;
  private options: BigRoadOptions = {};
  private scrollPercent = 1;

  protected onLoad(): void {
    this.content?.on(
      cc.Node.EventType.SIZE_CHANGED,
      this.onContentSizeChanged,
      this
    );
  }

  protected onDestroy(): void {
    this.content?.off(
      cc.Node.EventType.SIZE_CHANGED,
      this.onContentSizeChanged,
      this
    );
  }

  public initialize(options: BigRoadOptions) {
    this.options = options || {};
    this.scoreboard = BigRoadCreator.create(this.height);
    this.itemLayerPrefabs = [
      ...this.defaultLayerPrefabs,
      ...(options.layers || []),
    ];
    this.updatePadding(options.padding || 0);

    if (this.background && options.background) {
      this.background.spriteFrame = options.background;
    }
  }

  public render(data: Input[]) {
    this.scoreboard?.initialize(data);
    this.renderBigRoad();
    this.updateScrollView();
  }

  public fifo(input: Input) {
    this.scoreboard?.fifo(input);
    this.renderBigRoad();
    this.updateScrollView(this.scrollPercent);
  }

  private onContentSizeChanged() {
    const itemSize = this.getItemSize();

    this.content?.children?.forEach((child) => {
      const component = child.getComponent(BigRoadItem);

      component?.updateSize(itemSize, this.options.item);
    });
  }

  private renderBigRoad() {
    this.changeItems();
    this.traverse((item, point) => {
      item.node.active = true;

      if (point.status === undefined) {
        item.reset();
      } else {
        item.render(point, this.options.item);
      }
    });

    this.updateLayout();
  }

  private traverse(
    visit: (item: BigRoadItem, point: BigRoadScoreboardPoint<Input>) => void
  ) {
    this.scoreboard?.traverse((point) => {
      const index = this.height * point.x + point.y;
      const item = this.content?.children[index];
      const bigRoadItem = item?.getComponent(BigRoadItem);

      if (bigRoadItem) {
        visit(bigRoadItem, point);
      }
    });
  }

  private updatePadding(padding: number) {
    if (!this.contentLayout) {
      this.contentLayout = this.content?.getComponent(cc.Layout) ?? null;
    }

    if (this.contentLayout) {
      const containerWidget = this.content?.parent?.getComponent(cc.Widget);

      this.contentLayout.paddingBottom = padding;
      this.contentLayout.paddingTop = padding;

      if (containerWidget) {
        containerWidget.left = padding;
        containerWidget.right = padding;

        containerWidget.updateAlignment();
      }
    }
  }

  private updateLayout() {
    if (!this.contentLayout) {
      this.contentLayout = this.content?.getComponent(cc.Layout) ?? null;
    }

    if (this.contentLayout) {
      this.contentLayout.updateLayout();
    }
  }

  private updateScrollView(percent: number = 1) {
    if (!this.scrollView) {
      this.scrollView = this.node.getComponentInChildren(cc.ScrollView);
    }

    if (this.scrollView && !!this.scrollView.getMaxScrollOffset().x) {
      this.scrollView.scrollToPercentHorizontal(percent, 1, true);
    }
  }

  private onScrollContent(scrollView: cc.ScrollView) {
    const maxOffset = scrollView.getMaxScrollOffset();
    const currentOffset = scrollView.getScrollOffset();

    this.scrollPercent = Math.abs(currentOffset.x / (maxOffset.x || 1));
  }

  private changeItems() {
    const width = this.getWidthOfScoreboard();
    const height = this.scoreboard?.height() ?? 0;
    const itemCount = width * height;
    const difference = itemCount - (this.content?.children?.length ?? 0);

    if (difference > 0) {
      for (let i = 0; i < Math.abs(difference); i++) {
        const item = this.createNewItem();

        if (item) {
          this.content?.addChild(item);
        }
      }
    }

    const childrenCount = this.content?.children?.length ?? 0;
    for (let i = itemCount; i < childrenCount; i++) {
      const item = this.content?.children[i];

      if (item) {
        item.active = false;
      }
    }
  }

  private getWidthOfScoreboard() {
    const originalWidth = this.scoreboard?.width() ?? 0;
    const itemSize = this.getItemSize();
    const width = this.node.getComponent(cc.UITransform)?.width ?? 0;
    const calculatedWidth = Math.floor(width / (itemSize || 1));

    return Math.max(calculatedWidth, originalWidth);
  }

  private getItemSize() {
    const contentHeight =
      this.content?.getComponent(cc.UITransform)?.height ?? 0;
    const padding = Number(this.options?.padding || 0) * 2;

    return Math.floor((contentHeight - padding) / this.height);
  }

  private createNewItem() {
    const item = cc.instantiate(this.itemPrefab);

    const component = item.getComponent(BigRoadItem);

    component?.createLayers(this.itemLayerPrefabs);

    return item;
  }
}
