import { BigRoadScoreboard } from "../core/big-road-scoreboard";
import { GoodRoadColumnLengthDetector } from "../core/good-road-detection/good-road-column-length-detector";
import { SYMMETRICAL_PATTERNS } from "../core/good-road-detection/good-road-column-lenth-patterns";
import { GoodRoadRegexDetector } from "../core/good-road-detection/good-road-regex-detector";
import { BACCARAT_REGEX_PATTERNS } from "../core/good-road-detection/good-road-regex-patterns";
import { BigRoadConverter, Input } from "./big-road-converter";

export class BigRoadCreator {
  static create(height = 6) {
    const converter = new BigRoadConverter();
    const goodRoadColumnLengthDetector = new GoodRoadColumnLengthDetector({
      patterns: SYMMETRICAL_PATTERNS,
    });
    const goodRoadRegexDetector = new GoodRoadRegexDetector({
      patterns: BACCARAT_REGEX_PATTERNS,
    });

    return new BigRoadScoreboard<Input>({
      height,
      converter,
      goodRoadDetectors: [goodRoadRegexDetector, goodRoadColumnLengthDetector],
    });
  }
}
