"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigRoad = void 0;
const cc = __importStar(require("cc"));
const big_road_item_1 = require("./big-road-item");
const big_road_creator_1 = require("./implements/big-road-creator");
const { ccclass, property, menu } = cc._decorator;
let BigRoad = class BigRoad extends cc.Component {
    constructor() {
        super(...arguments);
        this.defaultLayerPrefabs = [];
        this.height = 6;
        this.scoreboard = null;
        this.itemLayerPrefabs = [];
        this.contentLayout = null;
        this.scrollView = null;
        this.options = {};
        this.scrollPercent = 1;
    }
    onLoad() {
        var _a;
        (_a = this.content) === null || _a === void 0 ? void 0 : _a.on(cc.Node.EventType.SIZE_CHANGED, this.onContentSizeChanged, this);
    }
    onDestroy() {
        var _a;
        (_a = this.content) === null || _a === void 0 ? void 0 : _a.off(cc.Node.EventType.SIZE_CHANGED, this.onContentSizeChanged, this);
    }
    initialize(options) {
        this.options = options || {};
        this.scoreboard = big_road_creator_1.BigRoadCreator.create(this.height);
        this.itemLayerPrefabs = [
            ...this.defaultLayerPrefabs,
            ...(options.layers || []),
        ];
        this.updatePadding(options.padding || 0);
        if (this.background && options.background) {
            this.background.spriteFrame = options.background;
        }
    }
    render(data) {
        var _a;
        (_a = this.scoreboard) === null || _a === void 0 ? void 0 : _a.initialize(data);
        this.renderBigRoad();
        this.updateScrollView();
    }
    fifo(input) {
        var _a;
        (_a = this.scoreboard) === null || _a === void 0 ? void 0 : _a.fifo(input);
        this.renderBigRoad();
        this.updateScrollView(this.scrollPercent);
    }
    onContentSizeChanged() {
        var _a, _b;
        const itemSize = this.getItemSize();
        (_b = (_a = this.content) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.forEach((child) => {
            const component = child.getComponent(big_road_item_1.BigRoadItem);
            component === null || component === void 0 ? void 0 : component.updateSize(itemSize, this.options.item);
        });
    }
    renderBigRoad() {
        this.changeItems();
        this.traverse((item, point) => {
            item.node.active = true;
            if (point.status === undefined) {
                item.reset();
            }
            else {
                item.render(point, this.options.item);
            }
        });
        this.updateLayout();
    }
    traverse(visit) {
        var _a;
        (_a = this.scoreboard) === null || _a === void 0 ? void 0 : _a.traverse((point) => {
            var _a;
            const index = this.height * point.x + point.y;
            const item = (_a = this.content) === null || _a === void 0 ? void 0 : _a.children[index];
            const bigRoadItem = item === null || item === void 0 ? void 0 : item.getComponent(big_road_item_1.BigRoadItem);
            if (bigRoadItem) {
                visit(bigRoadItem, point);
            }
        });
    }
    updatePadding(padding) {
        var _a, _b, _c, _d;
        if (!this.contentLayout) {
            this.contentLayout = (_b = (_a = this.content) === null || _a === void 0 ? void 0 : _a.getComponent(cc.Layout)) !== null && _b !== void 0 ? _b : null;
        }
        if (this.contentLayout) {
            const containerWidget = (_d = (_c = this.content) === null || _c === void 0 ? void 0 : _c.parent) === null || _d === void 0 ? void 0 : _d.getComponent(cc.Widget);
            this.contentLayout.paddingBottom = padding;
            this.contentLayout.paddingTop = padding;
            if (containerWidget) {
                containerWidget.left = padding;
                containerWidget.right = padding;
                containerWidget.updateAlignment();
            }
        }
    }
    updateLayout() {
        var _a, _b;
        if (!this.contentLayout) {
            this.contentLayout = (_b = (_a = this.content) === null || _a === void 0 ? void 0 : _a.getComponent(cc.Layout)) !== null && _b !== void 0 ? _b : null;
        }
        if (this.contentLayout) {
            this.contentLayout.updateLayout();
        }
    }
    updateScrollView(percent = 1) {
        if (!this.scrollView) {
            this.scrollView = this.node.getComponentInChildren(cc.ScrollView);
        }
        if (this.scrollView && !!this.scrollView.getMaxScrollOffset().x) {
            this.scrollView.scrollToPercentHorizontal(percent, 1, true);
        }
    }
    onScrollContent(scrollView) {
        const maxOffset = scrollView.getMaxScrollOffset();
        const currentOffset = scrollView.getScrollOffset();
        this.scrollPercent = Math.abs(currentOffset.x / (maxOffset.x || 1));
    }
    changeItems() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const width = this.getWidthOfScoreboard();
        const height = (_b = (_a = this.scoreboard) === null || _a === void 0 ? void 0 : _a.height()) !== null && _b !== void 0 ? _b : 0;
        const itemCount = width * height;
        const difference = itemCount - ((_e = (_d = (_c = this.content) === null || _c === void 0 ? void 0 : _c.children) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : 0);
        if (difference > 0) {
            for (let i = 0; i < Math.abs(difference); i++) {
                const item = this.createNewItem();
                if (item) {
                    (_f = this.content) === null || _f === void 0 ? void 0 : _f.addChild(item);
                }
            }
        }
        const childrenCount = (_j = (_h = (_g = this.content) === null || _g === void 0 ? void 0 : _g.children) === null || _h === void 0 ? void 0 : _h.length) !== null && _j !== void 0 ? _j : 0;
        for (let i = itemCount; i < childrenCount; i++) {
            const item = (_k = this.content) === null || _k === void 0 ? void 0 : _k.children[i];
            if (item) {
                item.active = false;
            }
        }
    }
    getWidthOfScoreboard() {
        var _a, _b, _c, _d;
        const originalWidth = (_b = (_a = this.scoreboard) === null || _a === void 0 ? void 0 : _a.width()) !== null && _b !== void 0 ? _b : 0;
        const itemSize = this.getItemSize();
        const width = (_d = (_c = this.node.getComponent(cc.UITransform)) === null || _c === void 0 ? void 0 : _c.width) !== null && _d !== void 0 ? _d : 0;
        const calculatedWidth = Math.floor(width / (itemSize || 1));
        return Math.max(calculatedWidth, originalWidth);
    }
    getItemSize() {
        var _a, _b, _c, _d;
        const contentHeight = (_c = (_b = (_a = this.content) === null || _a === void 0 ? void 0 : _a.getComponent(cc.UITransform)) === null || _b === void 0 ? void 0 : _b.height) !== null && _c !== void 0 ? _c : 0;
        const padding = Number(((_d = this.options) === null || _d === void 0 ? void 0 : _d.padding) || 0) * 2;
        return Math.floor((contentHeight - padding) / this.height);
    }
    createNewItem() {
        const item = cc.instantiate(this.itemPrefab);
        const component = item.getComponent(big_road_item_1.BigRoadItem);
        component === null || component === void 0 ? void 0 : component.createLayers(this.itemLayerPrefabs);
        return item;
    }
};
__decorate([
    property(cc.Node)
], BigRoad.prototype, "content", void 0);
__decorate([
    property(cc.Prefab)
], BigRoad.prototype, "itemPrefab", void 0);
__decorate([
    property([cc.Prefab])
], BigRoad.prototype, "defaultLayerPrefabs", void 0);
__decorate([
    property(cc.Sprite)
], BigRoad.prototype, "background", void 0);
BigRoad = __decorate([
    ccclass,
    menu("Scoreboard/BigRoad")
], BigRoad);
exports.BigRoad = BigRoad;
