export const range = (start: number, end: number): number[] => {
  let length = end - start + 1;

  return Array.from(
    { length },
    (_: unknown, idx: number): number => idx + start,
  );
};
