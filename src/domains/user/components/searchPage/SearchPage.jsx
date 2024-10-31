import { IconX } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { Badge } from "@/ui/components/ui/badge"
import { Loading } from "@/ui/components/ui/loading"

import { searchProducts } from "../../services/searchProductsService"

export function SearchPage() {
  const [products, setProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const { loading, onRequest } = useFetch()

  const searchText = searchParams.get("produto")
  const filterType = searchParams.get("tipo")
  const filterRole = searchParams.get("categoria")
  const filterPrice = searchParams.get("preco")

  console.log(searchText)
  console.log(filterRole)
  console.log(filterType)

  function handleSuccess(data) {
    setProducts(data)
  }
  function handleError() {
    console.log("erro")
  }

  function handleRemoveFilter(param, role) {
    setSearchParams((prev) => {
      const currentParams = new URLSearchParams(prev) // Mantém os parâmetros atuais
      const existingValues = currentParams.get(param)?.split(" ") || []

      if (existingValues.includes(role)) {
        // Se o título já estiver ativo, remove
        const updatedValues = existingValues.filter((val) => val !== role)
        if (updatedValues.length > 0) {
          currentParams.set(param, updatedValues.join(" ")) // Atualiza o parâmetro se ainda houver valores
        } else {
          currentParams.delete(param) // Remove o parâmetro se não houver valores
        }
      }

      return currentParams // Retorna os parâmetros atualizados
    })
  }

  useEffect(() => {
    async function request() {
      await onRequest({
        request: () => searchProducts(searchParams.toString()),
        onSuccess: handleSuccess,
        onError: handleError,
      })
    }
    request()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col gap-3">
      <section className="flex flex-wrap items-center justify-center gap-2">
        {filterType?.split(" ").map((role) => {
          return (
            <Badge className={"flex gap-1 px-2 py-1 text-sm"} key={role}>
              {role}
              <button onClick={() => handleRemoveFilter("tipo", role)}>
                <IconX size={16} />
              </button>
            </Badge>
          )
        })}
        {filterRole?.split(" ").map((role) => {
          return (
            <Badge className={"px-2 py-1 text-sm"} key={role}>
              {role}
              <button onClick={() => handleRemoveFilter("categoria", role)}>
                <IconX size={16} />
              </button>
            </Badge>
          )
        })}
        {filterPrice && (
          <Badge className={"px-2 py-1 text-sm"} key={"preco"}>
            {filterPrice}
            <button
              onClick={() => {
                setSearchParams((prev) => {
                  const currentParams = new URLSearchParams(prev)
                  currentParams.delete("preco")
                  return currentParams
                })
              }}
            >
              <IconX size={16} />
            </button>
          </Badge>
        )}
      </section>

      <h2>Buscando produtos por &quot;{searchText}&quot;</h2>

      <section>
        {products?.length > 0 ? (
          <div>produtos</div>
        ) : (
          <div>
            <p>Não foi possível encontrar nenhum produto.</p>
          </div>
        )}
      </section>
    </div>
  )
}
