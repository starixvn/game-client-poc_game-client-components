"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigRoadScoreboard = void 0;
const dragon_tail_board_1 = require("./dragon-tail/dragon-tail-board");
class BigRoadScoreboard {
    constructor(options) {
        this.dragonTailBoard = new dragon_tail_board_1.DragonTailBoard(options);
        this.converter = options.converter;
        this.goodRoadDetectors = options.goodRoadDetectors;
        this.input = [];
        this.groups = [];
    }
    initialize(input) {
        this.input = input;
        this.loadDragonTailBoard();
    }
    fifo(record) {
        if (this.input.length) {
            this.input.shift();
            this.input.push(record);
            this.loadDragonTailBoard();
        }
    }
    getGoodRoad() {
        return this.goodRoadDetectors.reduce((goodRoad, detector) => {
            if (!this.isValidGoodRoad(goodRoad)) {
                goodRoad = detector.detect(this.groups, this.dragonTailBoard);
            }
            return goodRoad;
        }, {});
    }
    width() {
        return this.dragonTailBoard.getWidth();
    }
    height() {
        return this.dragonTailBoard.getHeight();
    }
    traverse(visit) {
        const groups = this.converter.group(this.input);
        const width = this.width();
        const height = this.height();
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const point = this.getPoint(groups, x, y);
                visit(point);
            }
        }
    }
    getPoint(groups, x, y) {
        const status = this.dragonTailBoard.getStatus(x, y);
        const index = this.dragonTailBoard.getIndex(x, y);
        const data = index !== undefined ? groups[index] : [];
        return { data, x, y, status };
    }
    loadDragonTailBoard() {
        const groups = this.converter.group(this.input);
        this.groups = groups.map((group) => this.converter.convert(group));
        this.dragonTailBoard.clear();
        const lengthGroups = this.groups.length;
        for (let i = 0; i < lengthGroups; i++) {
            const isEndTail = this.groups[i] != this.groups[i + 1];
            this.dragonTailBoard.addNode(this.groups[i], isEndTail);
        }
    }
    isValidGoodRoad(goodRoad) {
        return (goodRoad && goodRoad.x >= 0 && goodRoad.height >= 1 && goodRoad.width >= 1);
    }
}
exports.BigRoadScoreboard = BigRoadScoreboard;
