import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { Loading } from "@/ui/components/ui/loading"

import { searchProducts } from "../../services/searchProductsService"
import { SearchProductItem } from "./SearchProductItem"

export function SearchProductList({
  products,
  finalRef,
  setProducts,
  totalPages,
  alreadyRenderFirstPage,
}) {
  const [currentPage, setCurrentPage] = useState(0)
  const { loading, onRequest } = useFetch()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (!alreadyRenderFirstPage || currentPage >= totalPages) return
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage((prev) => prev + 1)
      }
    })

    if (finalRef.current) {
      intersectionObserver.observe(finalRef.current)
    }

    async function request() {
      await onRequest({
        request: () => searchProducts(searchParams.toString(), currentPage),
        onSuccess: (data) =>
          setProducts((prevProducts) => ({
            ...prevProducts,
            content: [...prevProducts.content, ...data.content],
          })),
        onError: (error) => console.log(error),
      })
    }

    if (currentPage > 0) {
      // Executa apenas para páginas a partir da segunda
      request()
    }

    return () => intersectionObserver.disconnect()
    //eslint-disable-next-line
  }, [currentPage, alreadyRenderFirstPage])

  return (
    <>
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {products?.map((product) => {
          return (
            <SearchProductItem key={product?.productId} product={product} />
          )
        })}
      </section>
      <div id="sentinel" ref={finalRef} className="py-2">
        {loading && <Loading />}
      </div>
    </>
  )
}
