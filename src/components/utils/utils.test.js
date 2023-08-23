import { addComma, getNumberIntervals } from "./utils";

describe("addComma function", () => {
  it("should correctly add commas to a float", () => {
    expect(addComma(-7855948.9527)).toBe("-7,855,948.9527");
    expect(addComma(1234567.891)).toBe("1,234,567.891");
  });

  it("should correctly add commas to an integer", () => {
    expect(addComma(1000)).toBe("1,000");
    expect(addComma(1000000)).toBe("1,000,000");
    expect(addComma(-1000000)).toBe("-1,000,000");
  });

  it("should return the original string if it's not a number", () => {
    expect(addComma("abcd")).toBe("abcd");
  });

  it("should handle numbers without commas needed", () => {
    expect(addComma(999)).toBe("999");
    expect(addComma(-999)).toBe("-999");
    expect(addComma(0.1234)).toBe("0.1234");
  });

  it("should handle very large numbers", () => {
    expect(addComma(999999999999999)).toBe("999,999,999,999,999");
  });

  it("should handle very small numbers", () => {
    expect(addComma(0.0000001)).toBe("1e-7");
  });

  it("should handle numbers with long decimal places", () => {
    expect(addComma(1.123456789012345)).toBe("1.123456789012345");
  });

  it("should throw an error when passed null", () => {
    expect(() => addComma(null)).toThrow();
  });

  it("should throw an error when passed undefined", () => {
    expect(() => addComma(undefined)).toThrow();
  });
});

describe("getNumberIntervals", () => {
  it("should return the correct overlap and notInclude intervals", () => {
    const intervals = [
      [6, 11],
      [5, 8],
      [17, 20],
      [7, 7],
      [14, 17],
    ];
    const result = getNumberIntervals(intervals);

    expect(result).toEqual({
      overlap: [
        [6, 8],
        [17, 17],
      ],
      notInclude: [
        [0, 4],
        [12, 13],
      ],
    });
  });

  it("should handle no overlaps and no exclusions", () => {
    const intervals = [
      [0, 5],
      [6, 11],
      [12, 20],
    ];
    const result = getNumberIntervals(intervals);

    expect(result).toEqual({
      overlap: [],
      notInclude: [],
    });
  });

  it("should handle full overlap and full exclusions", () => {
    const intervals = [
      [0, 20],
      [0, 20],
    ];
    const result = getNumberIntervals(intervals);

    expect(result).toEqual({
      overlap: [[0, 20]],
      notInclude: [],
    });
  });

  it("should handle empty input", () => {
    const intervals = [];
    const result = getNumberIntervals(intervals);

    expect(result).toEqual({
      overlap: [],
      notInclude: [[0, 20]],
    });
  });

  it("should handle single intervals correctly", () => {
    const intervals = [
      [3, 3],
      [17, 17],
    ];
    const result = getNumberIntervals(intervals);

    expect(result).toEqual({
      overlap: [],
      notInclude: [
        [0, 2],
        [4, 16],
        [18, 20],
      ],
    });
  });

  it("should handle non-contiguous intervals", () => {
    const intervals = [
      [0, 4],
      [6, 11],
      [13, 18],
      [20, 20],
    ];
    const result = getNumberIntervals(intervals);

    expect(result).toEqual({
      overlap: [],
      notInclude: [
        [5, 5],
        [12, 12],
        [19, 19],
      ],
    });
  });
});
