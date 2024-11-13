/* eslint-disable */
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

import { SearchProductItem } from "@/domains/user/components/searchPage/SearchProductItem"

export function StoreProductList() {
  const { storeId } = useParams()
  const [filter, setFilter] = useState("expiry_asc")
  const { data: products, onRequest, loading } = useFetch()

  useEffect(() => {
    if (storeId)
      onRequest({
        request: () =>
          restaurantService.fetchRestaurantProductsByRestaurantId(storeId, filter),
      })
  }, [storeId, filter])

  if (loading) return <Loading />

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
            <SelectItem value="name_asc">Nome crescente</SelectItem>
            <SelectItem value="name_desc">Nome decrescente</SelectItem>
            <SelectItem value="price_asc">Menor preço</SelectItem>
            <SelectItem value="price_desc">Maior preço</SelectItem>
            <SelectItem value="expiry_asc">Perto do vencimento</SelectItem>
            <SelectItem value="expiry_desc">Longe do vencimento</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {products?.map((product) => {
          return (
            <SearchProductItem key={product?.productId} product={product} />
          )
        })}
      </div>
    </section>
  )
}
