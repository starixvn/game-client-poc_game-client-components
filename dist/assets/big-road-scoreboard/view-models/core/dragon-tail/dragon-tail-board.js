"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragonTailBoard = void 0;
const dragon_tail_position_1 = require("./dragon-tail-position");
class DragonTailBoard {
    constructor(options) {
        this.minimumHeight = 2;
        this.height =
            options.height >= this.minimumHeight
                ? options.height
                : this.minimumHeight;
        this.nodes = new Map();
        this.positivePosition = dragon_tail_position_1.DragonTailPosition.getInstance(0, 0);
        this.negativePosition = dragon_tail_position_1.DragonTailPosition.getInstance(0, 0);
        this.index = 0;
    }
    getStatus(x, y) {
        const position = dragon_tail_position_1.DragonTailPosition.getInstance(x, y);
        const node = this.nodes.get(position.getName());
        return node === null || node === void 0 ? void 0 : node.positive;
    }
    getIndex(x, y) {
        const position = dragon_tail_position_1.DragonTailPosition.getInstance(x, y);
        const node = this.nodes.get(position.getName());
        return node === null || node === void 0 ? void 0 : node.index;
    }
    getPosition(index) {
        const values = [...this.nodes.values()];
        const node = values.find((node) => node.index === index);
        return node ? [node.position.x, node.position.y] : [];
    }
    getHeight() {
        return this.height;
    }
    getWidth() {
        const keys = [...this.nodes.keys()];
        const maxX = Math.max(...keys.map((key) => Number(key.split("-")[0])));
        return maxX + 1;
    }
    setHeight(height) {
        if (this.height !== height && this.minimumHeight <= height) {
            this.height = height;
            const nodes = [...this.nodes.values()].sort((a, b) => a.index - b.index);
            const values = nodes.map((node) => node.positive);
            this.clear();
            const lengthGroups = values.length;
            for (let i = 0; i < lengthGroups; i++) {
                const isEndTail = values[i] != values[i + 1];
                this.addNode(values[i], isEndTail);
            }
        }
    }
    addNode(positive, isEndTail) {
        const node = {
            positive,
            position: positive ? this.positivePosition : this.negativePosition,
            index: this.index,
            isEndTail: isEndTail,
        };
        this.nodes.set(node.position.getName(), node);
        this.updateNextPositions(node, positive);
    }
    size() {
        return this.index;
    }
    clear() {
        this.nodes = new Map();
        this.positivePosition = dragon_tail_position_1.DragonTailPosition.getInstance(0, 0);
        this.negativePosition = dragon_tail_position_1.DragonTailPosition.getInstance(0, 0);
        this.index = 0;
    }
    updateNextPositions(node, positive) {
        const positionKey = positive ? "positivePosition" : "negativePosition";
        const oppositePositionKey = positive
            ? "negativePosition"
            : "positivePosition";
        const nextPosition = this.getNextPosition(node);
        const innerWidth = this.getInnerWidth();
        const nextOppositePosition = dragon_tail_position_1.DragonTailPosition.getInstance(innerWidth, 0);
        this[positionKey] = nextPosition;
        this[oppositePositionKey] = nextOppositePosition;
        this.index += 1;
    }
    getInnerWidth() {
        const keys = [...this.nodes.keys()];
        const firstRow = keys.filter((key) => key.match(/[0-9]*-0/));
        const maxX = Math.max(...firstRow.map((key) => Number(key.split("-")[0])));
        return maxX + 1;
    }
    getNextPosition(current) {
        var _a, _b;
        const bottom = current.position.getBottom();
        const right = current.position.getRight();
        const bottomLeft = bottom.getLeft();
        const isBottomValid = bottom.isValid(this.height);
        const isBottomEmpty = !this.nodes.has(bottom.getName());
        const bottomLeftHasDifferenceValue = ((_a = this.nodes.get(bottomLeft.getName())) === null || _a === void 0 ? void 0 : _a.positive) !== current.positive;
        const endTailBottomLef = (_b = this.nodes.get(bottomLeft.getName())) === null || _b === void 0 ? void 0 : _b.isEndTail;
        const isBottomLefNotEndTail = endTailBottomLef === false;
        const combineCase = bottomLeftHasDifferenceValue || isBottomLefNotEndTail;
        if (isBottomValid && isBottomEmpty && combineCase) {
            return bottom;
        }
        else {
            return right;
        }
    }
}
exports.DragonTailBoard = DragonTailBoard;
