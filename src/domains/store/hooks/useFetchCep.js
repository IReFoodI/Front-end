import { useEffect } from "react"

export const useFetchCep = (cep, setValue) => {
  useEffect(() => {
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            setValue("endereco", data.logradouro)
            setValue("complemento", data.complemento)
            setValue("cidade", data.localidade)
            setValue("uf", data.uf)
          }
        })
        .catch(() => console.error("Erro ao buscar CEP"))
    }
  }, [cep, setValue])
}
