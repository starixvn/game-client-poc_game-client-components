"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigRoadConverter = void 0;
class BigRoadConverter {
    convert(group) {
        return group.filter((round) => round.value).length !== 0;
    }
    group(items) {
        const groups = this.separateIntoGroups(items);
        const firstGroup = groups[0] || [];
        const isTieGroup = firstGroup.length && firstGroup.filter((round) => round.metadata && round.metadata.tie).length === firstGroup.length;
        if (isTieGroup) {
            const secondGroup = groups[1] || [];
            groups.shift();
            secondGroup.push(...firstGroup);
        }
        return groups;
    }
    separateIntoGroups(items) {
        const reducer = (groups, round) => {
            if (groups.length && round.metadata && round.metadata.tie) {
                const lastGroup = groups[groups.length - 1];
                lastGroup.push(round);
            }
            else {
                groups.push([round]);
            }
            return groups;
        };
        return items.reduce(reducer, []);
    }
}
exports.BigRoadConverter = BigRoadConverter;
