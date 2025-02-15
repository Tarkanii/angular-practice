export const range = (start: number, end: number): number[] => {
  return [...Array(end - start).keys()].map((el: number) => el + start);
}

export const pluck = <T>(arr: T[], field: keyof T): T[keyof T][] => {
  return arr.map((el: T) => el[field]);
}