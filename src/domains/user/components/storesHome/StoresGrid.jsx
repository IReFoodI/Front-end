import React from "react"

import { StoreCard } from "./StoreCard"

export function StoresGrid({
  stores,
  toggleFavorite,
  singleColumn,
  type = "home",
}) {
  return (
    <div
      className={`grid gap-6 ${singleColumn ? "grid-cols-1" : "sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"}`}
    >
      {stores.length > 0 ? (
        stores.map((store) => (
          <React.Fragment key={store.id}>
            <StoreCard
              storeData={store}
              onFavoriteToggle={() => toggleFavorite(store.id)}
            />
          </React.Fragment>
        ))
      ) : type === "favorites" ? (
        <p className="col-span-full text-center">Adicione um favorito.</p>
      ) : (
        <p className="col-span-full text-center">Nenhuma loja disponível.</p>
      )}
    </div>
  )
}
