import { useState } from "react"
import { toast } from "sonner"

export function useFetch(fetchFunction) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  // Função para disparar a requisição manualmente
  const executeFetch = async (
    params = {},
    callback,
    useToast,
    toastSuccessMessage,
    toastErrorMessage
  ) => {
    setIsLoading(true)
    setIsError(false) // Reseta o estado de erro antes de cada nova requisição
    let toastMessage

    const translateMessage = {
      "Invalid credentials": "E-mail ou senha incorretos.",
    }
    try {
      const result = await fetchFunction(params)
      setResponse(result)
      console.log(result)
      if (useToast) {
        toast.success(toastSuccessMessage)
      }
      callback && callback()
    } catch (requestError) {
      console.log(requestError)
      setError(requestError)
      setIsError(true)
      if (useToast) {
        if (requestError?.response?.data?.message) {
          toastMessage = translateMessage[requestError?.response?.data?.message]
        }

        if (toastErrorMessage) {
          toastMessage = toastErrorMessage
        }
        toast.error(toastMessage ? toastMessage : "Ocorreu um erro.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Retorna os estados e a função que dispara a requisição
  return { isLoading, isError, response, error, executeFetch }
}
