import { IconX } from "@tabler/icons-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { Badge } from "@/ui/components/ui/badge"
import { Loading } from "@/ui/components/ui/loading"

import { searchProducts } from "../../services/searchProductsService"
import { SearchProductList } from "./SearchProductList"

export function SearchPage() {
  const [products, setProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const [alreadyRenderFirstPage, setAlreadyRenderFirstPage] = useState(false)
  const finalRef = useRef(null)

  const { loading, onRequest } = useFetch()

  const searchText = searchParams.get("produto")
  const filterType = searchParams.get("tipo")
  const filterRole = searchParams.get("categoria")
  const filterPrice = searchParams.get("preco")

  function handleSuccess(data) {
    setProducts(data)
    setAlreadyRenderFirstPage(true)
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

  const request = useCallback(async () => {
    await onRequest({
      request: () => searchProducts(searchParams.toString(), 0),
      onSuccess: handleSuccess,
      onError: handleError,
    })
  }, [searchParams, onRequest])

  useEffect(() => {
    request()
  }, [request])

  return (
    <div className="flex flex-col gap-3">
      <section className="flex flex-wrap items-center justify-center gap-2">
        {searchText && (
          <Badge className={"px-2 py-1 text-sm"} key={"produto"}>
            {searchText}
            <button
              onClick={() => {
                setSearchParams((prev) => {
                  const currentParams = new URLSearchParams(prev)
                  currentParams.delete("produto")
                  return currentParams
                })
              }}
            >
              <IconX size={16} />
            </button>
          </Badge>
        )}
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

      {loading ? (
        <Loading />
      ) : (
        <>
          <h2>
            Foram encontrados{" "}
            <span className="font-medium"> {products?.totalElements}</span>{" "}
            produtos.
          </h2>
          <section>
            {products?.content?.length > 0 ? (
              <SearchProductList
                products={products?.content}
                finalRef={finalRef}
                setProducts={setProducts}
                totalPages={products?.totalPages}
                alreadyRenderFirstPage={alreadyRenderFirstPage}
              />
            ) : (
              <div className="flex flex-col">
                <p>
                  Infelizmente não foi possível encontrar nenhum produto
                  buscando por esses filtros. <br />
                  Tente buscar por outros filtros.
                </p>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}
