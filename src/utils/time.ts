export const getTimeDifferenceString = (date: Date) =>
  new Date(+new Date() - +date).toTimeString().slice(3, 8);

export const msToTimeString = (ms: number) =>
  new Date(ms).toTimeString().slice(3, 8);
