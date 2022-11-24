"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigRoadCreator = void 0;
const big_road_scoreboard_1 = require("../core/big-road-scoreboard");
const good_road_column_length_detector_1 = require("../core/good-road-detection/good-road-column-length-detector");
const good_road_column_lenth_patterns_1 = require("../core/good-road-detection/good-road-column-lenth-patterns");
const good_road_regex_detector_1 = require("../core/good-road-detection/good-road-regex-detector");
const good_road_regex_patterns_1 = require("../core/good-road-detection/good-road-regex-patterns");
const big_road_converter_1 = require("./big-road-converter");
class BigRoadCreator {
    static create(height = 6) {
        const converter = new big_road_converter_1.BigRoadConverter();
        const goodRoadColumnLengthDetector = new good_road_column_length_detector_1.GoodRoadColumnLengthDetector({
            patterns: good_road_column_lenth_patterns_1.SYMMETRICAL_PATTERNS,
        });
        const goodRoadRegexDetector = new good_road_regex_detector_1.GoodRoadRegexDetector({
            patterns: good_road_regex_patterns_1.BACCARAT_REGEX_PATTERNS,
        });
        return new big_road_scoreboard_1.BigRoadScoreboard({
            height,
            converter,
            goodRoadDetectors: [goodRoadRegexDetector, goodRoadColumnLengthDetector],
        });
    }
}
exports.BigRoadCreator = BigRoadCreator;
