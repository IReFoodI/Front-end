import { useCallback, useState } from "react"
import { toast } from "sonner"

/**
 * Hook personalizado para realizar requisições assíncronas e gerenciar o estado de carregamento, dados e erros.
 *
 * @returns {Object} Retorna um objeto contendo `data`, `loading`, `error` e a função `onRequest`.
 *
 * @property {any} data - Dados retornados pela requisição. Inicialmente é `null`.
 * @property {boolean} loading - Estado de carregamento da requisição. `true` enquanto a requisição está em andamento, e `false` quando finaliza.
 * @property {any} error - Contém o erro retornado pela requisição em caso de falha, ou `null` se não houver erro.
 * @property {function} onRequest - Função que executa uma requisição assíncrona e trata sucesso ou erro.
 * Executa uma requisição assíncrona e atualiza os estados de `data`, `loading` e `error`.
 *
 * @param {Object} options - Parâmetros da requisição.
 * @param {function} options.request - Função assíncrona que faz a requisição (deve retornar uma promessa).
 * @param {function} [options.onSuccess] - Função opcional que será executada em caso de sucesso da requisição, recebendo os dados retornados.
 * @param {function} [options.onError] - Função opcional que será executada em caso de falha da requisição, recebendo o erro ocorrido.
 * @param {string} [options.successMessage] - Mensagem de sucesso a ser exibida quando a requisição for concluída com sucesso.
 * @param {string} [options.errorMessage] - Mensagem de erro a ser exibida em caso de falha na requisição (caso não fornecida, será usada a mensagem do erro ou uma mensagem genérica).
 *
 * @returns {void}
 */
export function useFetch() {
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(null)

  const onRequest = useCallback(
    async ({ request, onSuccess, onError, successMessage, errorMessage }) => {
      let response
      try {
        setError(null)
        setLoading(true)
        response = await request()
        setData(response?.data)
        onSuccess && onSuccess(response?.data)
        // console.log(response)
        successMessage && toast?.success(successMessage)
      } catch (err) {
        setError(err)
        onError && onError(err)
        setData(null)
        toast.error(
          errorMessage ??
            err?.response?.data?.error ??
            err?.response?.data?.message ??
            err?.message ??
            "Ocorreu um erro"
        )
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { data, loading, onRequest, error }
}
