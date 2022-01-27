export function startDate() {
  const date = new Date();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = '01';
  return [date.getFullYear(), month, day].join('-');
}
