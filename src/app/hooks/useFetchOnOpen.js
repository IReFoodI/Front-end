import { useEffect, useState } from "react"

export function useFetchOnOpen(fetchFunction, params = {}, dependencies = []) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true // Variável para evitar update após desmontagem do componente
    setIsLoading(true)

    async function request() {
      try {
        const result = await fetchFunction(params)
        if (isMounted) {
          setResponse(result)
          setIsError(false)
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError)
          setIsError(true)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    request()

    // Limpa quando o componente é desmontado
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFunction, ...dependencies])

  return { isLoading, isError, response, error }
}
