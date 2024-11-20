export function decimalFormatter(num) {
  return num % 1 === 0 ? `${num}.0` : `${num}`
}
