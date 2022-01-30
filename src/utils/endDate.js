/* eslint-disable */
export function endDate() {
  const currMonth = new Date().getMonth();
  if (currMonth === 11) {
    const date = new Date();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `31`;
    return [date.getFullYear(), month, day].join('-');
  } else {
    const date = new Date();
    const month = `0${date.getMonth() + 2}`.slice(-2);
    const day = `01`;
    return [date.getFullYear(), month, day].join('-');
  }
}
