import { IConverter } from "../core/converter";

export interface Input {
  value: boolean;
  metadata: Record<string, unknown>;
}

export class BigRoadConverter implements IConverter<Input> {
  convert(group: Input[]): boolean {
    return group.filter((round) => round.value).length !== 0;
  }

  group(items: Input[]): Input[][] {
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

  private separateIntoGroups(items: Input[]): Input[][] {
    const reducer = (groups: Input[][], round: Input) => {
      if (groups.length && round.metadata && round.metadata.tie) {
        const lastGroup = groups[groups.length - 1];

        lastGroup.push(round);
      } else {
        groups.push([round]);
      }

      return groups;
    };

    return items.reduce(reducer, []);
  }
}
