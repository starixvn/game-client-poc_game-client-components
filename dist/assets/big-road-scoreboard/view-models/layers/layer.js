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
var Layer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const cc = __importStar(require("cc"));
const { ccclass, menu } = cc._decorator;
let Layer = Layer_1 = class Layer extends cc.Component {
    onLoad() {
        this.node.on(Layer_1.renderEvent, this.render, this);
        this.node.on(Layer_1.resetEvent, this.reset, this);
        this.node.on(Layer_1.updateSizeEvent, this.onUpdateSize, this);
        this.reset();
    }
    onDestroy() {
        this.node.off(Layer_1.renderEvent, this.render, this);
        this.node.off(Layer_1.resetEvent, this.reset, this);
        this.node.off(Layer_1.updateSizeEvent, this.onUpdateSize, this);
    }
    render(input) {
        this.node.active = !!input;
    }
    reset() {
        this.node.active = false;
    }
    onUpdateSize(size, options) {
        var _a;
        (_a = this.node
            .getComponent(cc.UITransform)) === null || _a === void 0 ? void 0 : _a.setContentSize(new cc.Size(size - ((options === null || options === void 0 ? void 0 : options.padding) || 0), size - ((options === null || options === void 0 ? void 0 : options.padding) || 0)));
    }
};
Layer.renderEvent = "render";
Layer.resetEvent = "reset";
Layer.updateSizeEvent = "update-size";
Layer = Layer_1 = __decorate([
    ccclass,
    menu("Scoreboard/Layers/Layer")
], Layer);
exports.default = Layer;
