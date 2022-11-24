"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodRoadColumnLengthDetector = void 0;
class GoodRoadColumnLengthDetector {
    constructor(options) {
        this.defaultResult = { x: -1, width: 0, height: 0 };
        this.patterns = options.patterns;
    }
    detect(input, board) {
        const columns = this.getColumns(board);
        return this.patterns.reduce((result, pattern) => {
            if (result.x < 0) {
                result = this.detectSinglePattern(pattern, columns, board);
            }
            return result;
        }, this.defaultResult);
    }
    detectSinglePattern(pattern, columns, board) {
        const columnLengths = columns.map((column) => column.length);
        const repeat = (data, times = 1) => [...Array(times)].map(() => data).reduce((acc, val) => acc.concat(val), []);
        const patternColumns = repeat(pattern.columns, pattern.repeat || 1);
        const selectedColumns = columnLengths.reduce((result, length, index) => {
            if (patternColumns.length > index && result.length == index) {
                const patternColumn = patternColumns[index];
                if ((patternColumn.exact && patternColumn.length === length) || (!patternColumn.exact && patternColumn.length <= length)) {
                    result.push(index);
                }
            }
            return result;
        }, []);
        if (selectedColumns.length >= pattern.columns.length) {
            const allEntries = selectedColumns.reduce((acc, index) => acc.concat(columns[index]), []);
            if (allEntries.length) {
                const start = Math.min(...allEntries);
                const end = Math.max(...allEntries);
                return this.getGoodRoad(start, end, board);
            }
        }
        return this.defaultResult;
    }
    getColumns(board) {
        const height = board.getHeight();
        const columns = [];
        board.setHeight(board.size());
        for (let x = board.getWidth() - 1; x > -1; x--) {
            const column = [];
            for (let y = 0; y < board.size(); y++) {
                const index = board.getIndex(x, y);
                if (index !== undefined) {
                    column.push(index);
                }
            }
            columns.push(column);
        }
        board.setHeight(height);
        return columns;
    }
    getGoodRoad(start, end, board) {
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
exports.GoodRoadColumnLengthDetector = GoodRoadColumnLengthDetector;
