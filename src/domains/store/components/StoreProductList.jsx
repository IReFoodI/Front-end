import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import restaurantService from "@/app/service/restaurantService"
import { Loading } from "@/ui/components/ui/loading"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/ui/select"

import { StoreProductItem } from "./StoreProductItem"

export function StoreProductList() {
  const { storeId } = useParams()
  const { data: products, onRequest, error, loading } = useFetch()
  const [productsWithStoreId, setProductsWithStoreId] = useState([])

  useEffect(() => {
    if (storeId)
      onRequest({
        request: () =>
          restaurantService.fetchRestaurantProductsByRestaurantId(storeId),
      })
  }, [storeId])

  if (loading) return <Loading />

  return (
    <section className="mt-5 flex flex-col gap-5 xl:mt-0">
      <div className="flex w-full items-center justify-between">
        <h2 className="flex items-center justify-center text-xl font-semibold">
          Produtos:
        </h2>
        <Select>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="crescentName">Nome crescente</SelectItem>
            <SelectItem value="descendingName">Nome decrescente</SelectItem>
            <SelectItem value="lowestPrice">Menor preço</SelectItem>
            <SelectItem value="highestPrice">Maior preço</SelectItem>
            <SelectItem value="expiringSoon">Perto do vencimento</SelectItem>
            <SelectItem value="longExpiration">Longe do vencimento</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((product, index) => (
          <StoreProductItem {...product} key={product.productId + index} />
        ))}
      </div>
    </section>
  )
}
