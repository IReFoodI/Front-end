export function dateFormatter(date) {
  const options = {
    weekday: "long", // Dia da semana completo
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo", // Define o fuso horário UTC-3 (Brasil)
    hour12: false, // Usa o formato 24 horas
  }

  const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(date)

  const [weekday, dayMonthYear, time] = formattedDate.split(", ")
  return `${weekday.slice(0, 1).toUpperCase() + weekday.slice(1, weekday.length)}, ${dayMonthYear}, às ${time}`
}
