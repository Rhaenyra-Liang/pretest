export const addComma = (num) => {
  const s = num.toString().replace(/,/g, "");
  const [originalIntPart, decimalPart] = s.includes(".") ? s.split(".") : [s];
  const formattedIntPart = originalIntPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  if (decimalPart !== undefined) {
    return `${formattedIntPart}.${decimalPart}`;
  } else {
    return formattedIntPart;
  }
};

export const getNumberIntervals = (intervals) => {
  const counts = Array(21).fill(0);

  for (let interval of intervals) {
    if (interval && interval.length >= 2) {
      for (let i = interval[0]; i <= interval[1]; i++) {
        counts[i]++;
      }
    }
  }

  const overlap = [];
  const notInclude = [];

  let i = 0;
  while (i < counts.length) {
    if (counts[i] > 1) {
      let start = i;
      while (i < counts.length && counts[i] > 1) {
        i++;
      }
      overlap.push([start, i - 1]);
    } else if (counts[i] === 0) {
      let start = i;
      while (i < counts.length && counts[i] === 0) {
        i++;
      }
      notInclude.push([start, i - 1]);
    } else {
      i++;
    }
  }
  return {
    overlap,
    notInclude,
  };
};
