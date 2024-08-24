import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/ui/select"

import StoreProductItem from "./StoreProductItem"

const products = [
  {
    id: 1,
    fullPrice: 60,
    price: 40.020202,
    name: "Combo Hamburguer",
    quantity: 10,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi possimus illum eveniet libero cumque, minima veniam excepturi deserunt totam sed.",
  },

  {
    id: 2,
    fullPrice: 40,
    price: 20,
    name: "Hamburguer",
    quantity: 5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elitrunt totam sed.",
  },
  {
    id: 3,
    fullPrice: 40,
    price: 20,
    name: "Hamburguer",
    quantity: 5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elitrunt totam sed.",
  },
  {
    id: 4,
    fullPrice: 40,
    price: 20,
    name: "Hamburguer",
    quantity: 5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elitrunt totam sed.",
  },
]

//Depois vai receber o products como parâmetro ou fazer a requisição aqui mesmo
const StoreProductList = () => {
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
          <StoreProductItem {...product} key={product.id} />
        ))}
      </div>
    </section>
  )
}

export default StoreProductList
