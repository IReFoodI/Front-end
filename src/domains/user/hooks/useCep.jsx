import axios from "axios"
import { useEffect } from "react"

export const useCep = (cep, setValue, getValues) => {
  useEffect(() => {
    if (cep.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          const data = response.data
          if (!data.erro) {
            setValue("city", data.localidade)
            setValue("state", data.uf)
            if (!getValues("street")) setValue("street", data.logradouro)
            if (!getValues("additionalInfo"))
              setValue("additionalInfo", data.complemento)
            if (!getValues("neighborhood"))
              setValue("neighborhood", data.bairro)
            console.log(data)
          }
        })
        .catch(() => console.error("Erro ao buscar CEP"))
    }
  }, [cep, setValue, getValues])
}
