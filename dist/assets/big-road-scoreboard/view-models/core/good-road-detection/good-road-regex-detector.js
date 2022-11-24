"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodRoadRegexDetector = void 0;
class GoodRoadRegexDetector {
    constructor(options) {
        this.defaultResult = { x: -1, width: 0, height: 0 };
        this.patterns = options.patterns;
    }
    detect(input, board) {
        const line = input.map((status) => Number(status)).join("");
        return this.patterns.reduce((result, pattern) => {
            if (result.x < 0) {
                result = this.detectSinglePattern(line, board, pattern);
            }
            return result;
        }, this.defaultResult);
    }
    detectSinglePattern(line, board, regex) {
        var _a;
        const result = line.match(regex);
        const { prefix, goodRoad } = (_a = result === null || result === void 0 ? void 0 : result.groups) !== null && _a !== void 0 ? _a : { prefix: "", goodRoad: "" };
        const detectedLength = prefix.length + goodRoad.length;
        if (detectedLength === line.length) {
            const start = prefix.length;
            const end = prefix.length + goodRoad.length - 1;
            return this.getGoodRoad(start, end, board);
        }
        return this.defaultResult;
    }
    getGoodRoad(start, end, board) {
        if (end - start < 0) {
            return this.defaultResult;
        }
        const [startX, startY] = board.getPosition(start);
        const [endX, endY] = [...Array(end - start).entries()].reduce(([x, y], _, index) => {
            const [currentX, currentY] = board.getPosition(start + index + 1);
            return [Math.max(x, currentX), Math.max(y, currentY)];
        }, [startX, startY]);
        return {
            x: startX,
            width: endX - startX + 1,
            height: endY - startY + 1,
        };
    }
}
exports.GoodRoadRegexDetector = GoodRoadRegexDetector;
