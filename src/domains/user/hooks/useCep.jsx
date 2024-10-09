import { useEffect } from "react"

export const useFetchCep = (cep, setValue) => {
  useEffect(() => {
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            setValue("address ", data.logradouro)
            setValue("additionalInfo ", data.complemento)
            setValue("city ", data.localidade)
            setValue("state ", data.uf)
          }
        })
        .catch(() => console.error("Erro ao buscar CEP"))
    }
  }, [cep, setValue])
}
