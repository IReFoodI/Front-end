export function dateFormatterYearMonthDay(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error("Data inválida fornecida:", date)
    return "Data inválida"
  }

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }

  const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(date)
  return formattedDate
}
