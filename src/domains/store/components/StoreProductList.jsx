/* eslint-disable */
import { useCallback, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/ui/select"

import { useProductsStore } from "@/app/store/useProducts"
import { SearchProductItem } from "@/domains/user/components/searchPage/SearchProductItem"
import { Button } from "@/ui/components/ui/button/button"
import { NotFound } from "@/ui/components/NotFound"
import { IconMeatOff } from "@tabler/icons-react"

export function StoreProductList() {
  const { storeId } = useParams()
  const navigate = useNavigate()
  const {
    filter,
    products,
    currentPage,
    fetchProducts,
    setStoreId,
    setFilter,
    setCurrentPage,
  } = useProductsStore()
  const currentPageFromUrl =
    parseInt(new URLSearchParams(location.search).get("page")) || 0

  useEffect(() => {
    setStoreId(storeId)
    handlePageChange(0)
  }, [storeId])

  const onFetchProduct = useCallback(() => {
    setCurrentPage(currentPageFromUrl)
    fetchProducts()
  }, [storeId, currentPageFromUrl, filter])

  useEffect(() => {
    fetchProducts()
  }, [storeId, filter, currentPageFromUrl])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    navigate(`?page=${newPage}`)
  }

  if (products?.products?.length == 0)
    return (
      <NotFound
        Icon={IconMeatOff}
        title={"Essa loja não tem produtos"}
        description={"Explore outros estabelecimentos"}
        linkTo={"/"}
        textButton={"Explorar agora!"}
      />
    )

  return (
    <section className="mt-5 flex flex-col gap-5 xl:mt-0">
      <div className="flex w-full items-center justify-between">
        <h2 className="flex items-center justify-center text-xl font-semibold">
          Produtos:
        </h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expiry_asc">Perto do vencimento</SelectItem>
            <SelectItem value="expiry_desc">Longe do vencimento</SelectItem>
            <SelectItem value="name_asc">Nome crescente</SelectItem>
            <SelectItem value="name_desc">Nome decrescente</SelectItem>
            <SelectItem value="price_asc">Menor preço</SelectItem>
            <SelectItem value="price_desc">Maior preço</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {products?.products?.map((product) => {
          return (
            <SearchProductItem
              key={product?.productId}
              product={product}
              onAddItem={onFetchProduct}
            />
          )
        })}
      </div>
      <div className="mt-4 flex justify-between">
        <Button
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Página Anterior
        </Button>
        <Button
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === products?.totalPages - 1}
        >
          Próxima Página
        </Button>
      </div>
      <div className="text-xs">
        Exibindo <strong>{products?.currentPage || 0 + 1}</strong> de{" "}
        <strong>{products?.totalPages || 0}</strong> páginas
      </div>
    </section>
  )
}
