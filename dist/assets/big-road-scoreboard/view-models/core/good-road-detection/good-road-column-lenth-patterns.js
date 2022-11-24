"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYMMETRICAL_PATTERNS = exports.SEPARATED = exports.ONE_HOME_TWO_ROOMS = exports.CHASE = exports.ADJACENT_TWO_COLUMNS = exports.LONG_ROAD = void 0;
exports.LONG_ROAD = { columns: [{ exact: false, length: 4 }], repeat: 0 };
exports.ADJACENT_TWO_COLUMNS = {
    columns: [
        { exact: false, length: 2 },
        { exact: false, length: 2 },
    ],
    repeat: 0,
};
exports.CHASE = {
    columns: [
        { exact: true, length: 1 },
        { exact: true, length: 1 },
        { exact: true, length: 1 },
        { exact: true, length: 1 },
    ],
    repeat: 50,
};
exports.ONE_HOME_TWO_ROOMS = {
    columns: [
        { exact: true, length: 2 },
        { exact: true, length: 1 },
        { exact: true, length: 2 },
        { exact: true, length: 1 },
    ],
    repeat: 0,
};
exports.SEPARATED = {
    columns: [
        { exact: false, length: 2 },
        { exact: false, length: 1 },
        { exact: true, length: 1 },
        { exact: false, length: 1 },
        { exact: false, length: 2 },
        { exact: false, length: 1 },
        { exact: true, length: 1 },
    ],
    repeat: 0,
};
exports.SYMMETRICAL_PATTERNS = [exports.SEPARATED, exports.LONG_ROAD, exports.ADJACENT_TWO_COLUMNS, exports.CHASE, exports.ONE_HOME_TWO_ROOMS];
