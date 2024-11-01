import { SearchProductItem } from "./SearchProductItem"

export function SearchProductList({ products }) {
  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {products?.map((product) => {
        return <SearchProductItem key={product?.productId} product={product} />
      })}
    </section>
  )
}
