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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cc = __importStar(require("cc"));
const layer_1 = __importDefault(require("./layer"));
const { ccclass, menu, property } = cc._decorator;
let TieLayer = class TieLayer extends layer_1.default {
    render(input) {
        const rounds = input.status !== undefined
            ? input.data.filter((result) => { var _a; return (_a = result === null || result === void 0 ? void 0 : result.metadata) === null || _a === void 0 ? void 0 : _a.tie; })
            : [];
        this.label.string = `${rounds.length}`;
        this.icon.active = rounds.length === 1;
        this.label.node.active = rounds.length > 1;
        this.node.active = !!rounds.length;
    }
    onUpdateSize(size, options) {
        var _a;
        super.onUpdateSize(size, options);
        const tieSize = size * 0.5;
        this.label.fontSize = tieSize;
        (_a = this.icon
            .getComponent(cc.UITransform)) === null || _a === void 0 ? void 0 : _a.setContentSize(new cc.Size(tieSize, tieSize));
    }
};
__decorate([
    property(cc.Node)
], TieLayer.prototype, "icon", void 0);
__decorate([
    property(cc.Label)
], TieLayer.prototype, "label", void 0);
TieLayer = __decorate([
    ccclass,
    menu("Scoreboard/Layers/TieLayer")
], TieLayer);
exports.default = TieLayer;
