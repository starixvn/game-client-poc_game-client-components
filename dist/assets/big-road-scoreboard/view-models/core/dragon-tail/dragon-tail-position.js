"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragonTailPosition = void 0;
class DragonTailPosition {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
    }
    static getInstance(x, y) {
        return new DragonTailPosition({ x, y });
    }
    getName() {
        return `${this.x}-${this.y}`;
    }
    getBottom() {
        return new DragonTailPosition({ x: this.x, y: this.y + 1 });
    }
    getRight() {
        return new DragonTailPosition({ x: this.x + 1, y: this.y });
    }
    getLeft() {
        return new DragonTailPosition({ x: this.x - 1, y: this.y });
    }
    isValid(height) {
        return this.x >= 0 && this.y < height;
    }
}
exports.DragonTailPosition = DragonTailPosition;
