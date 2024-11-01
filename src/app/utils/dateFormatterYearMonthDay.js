export function dateFormatterYearMonthDay(date) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }

  const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(date)
  return formattedDate
}
