"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACCARAT_REGEX_PATTERNS = exports.NEGATIVE_ACROSS_POSITIVE = exports.POSITIVE_ACROSS_NEGATIVE = void 0;
exports.POSITIVE_ACROSS_NEGATIVE = /(?<prefix>[01]*0|^)(?<goodRoad>[1]{4,}0110)/;
exports.NEGATIVE_ACROSS_POSITIVE = /(?<prefix>[01]*1|^)(?<goodRoad>001[0]{4,}11)/;
exports.BACCARAT_REGEX_PATTERNS = [exports.POSITIVE_ACROSS_NEGATIVE, exports.NEGATIVE_ACROSS_POSITIVE];
