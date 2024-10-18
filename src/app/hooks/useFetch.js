import { useState } from "react"

export function useFetch(fetchFunction) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  // Função para disparar a requisição manualmente
  const executeFetch = async (params = {}) => {
    setIsLoading(true)
    setIsError(false) // Reseta o estado de erro antes de cada nova requisição

    try {
      const result = await fetchFunction(params)
      setResponse(result)
    } catch (requestError) {
      console.log("deu erro")
      setError(requestError)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  // Retorna os estados e a função que dispara a requisição
  return { isLoading, isError, response, error, executeFetch }
}
