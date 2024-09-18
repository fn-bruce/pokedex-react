import { range } from "./range";

describe("range", () => {
  it("returns an empty array when start is greater than end", () => {
    const start = 5;
    const end = 0;
    const expected: number[] = [];

    const result = range(start, end);

    expect(result).toStrictEqual(expected);
  });

  it("returns an array with a single element when start equals end", () => {
    const start = 3;
    const end = 3;
    const expected = [3];

    const result = range(start, end);

    expect(result).toStrictEqual(expected);
  });

  it("returns a range with negative numbers", () => {
    const start = -3;
    const end = 2;
    const expected = [-3, -2, -1, 0, 1, 2];

    const result = range(start, end);

    expect(result).toStrictEqual(expected);
  });

  it("returns a range starting from zero", () => {
    const start = 0;
    const end = 3;
    const expected = [0, 1, 2, 3];

    const result = range(start, end);

    expect(result).toStrictEqual(expected);
  });

  it("returns a range with large numbers", () => {
    const start = 100;
    const end = 105;
    const expected = [100, 101, 102, 103, 104, 105];

    const result = range(start, end);

    expect(result).toStrictEqual(expected);
  });
});
