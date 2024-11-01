import { SearchProductItem } from "./SearchProductItem"

export function SearchProductList({ products }) {
  console.log(products)

  return (
    <section className="flex flex-wrap gap-3">
      {products?.map((product) => {
        return <SearchProductItem key={product?.productId} product={product} />
      })}
    </section>
  )
}
