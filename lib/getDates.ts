export const getDates = function (start: Date, end: Date) {
  let array = [];
  for (
    let d = new Date(start);
    d <= new Date(end);
    d.setDate(d.getDate() + 1)
  ) {
    array.push(new Date(d));
  }
  return array;
};
