export const getTimeDifferenceString = (date) =>
  new Date(new Date() - date).toTimeString().slice(3, 8);

export const msToTimeString = (ms) => new Date(ms).toTimeString().slice(3, 8);
