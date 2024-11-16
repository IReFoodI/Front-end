export function cepFormatter(data) {
  const cep = data.replace(/\D/g, "")

  if (cep.length > 5) {
    return `${cep.slice(0, 5)}-${cep.slice(5, 8)}`
  }

  return cep
}
