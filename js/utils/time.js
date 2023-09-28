export const getTimeDifferenceString = (date) =>
  new Date(new Date() - date).toTimeString().slice(3, 8);
