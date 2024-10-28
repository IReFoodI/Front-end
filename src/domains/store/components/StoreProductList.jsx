import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/ui/select"

import { useProducts } from "../hooks/useProducts"
import { StoreProductItem } from "./StoreProductItem"

//Depois vai receber o products como parâmetro ou fazer a requisição aqui mesmo
export function StoreProductList() {
  const { products } = useProducts()

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
        {products?.map((product) => (
          <StoreProductItem {...product} key={product.productId} />
        ))}
      </div>
    </section>
  )
}
