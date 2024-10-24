import React from "react"

import { BannerPromo } from "./BannerPromo"
import { StoreCard } from "./StoreCard"

export function StoresGrid({
  stores,
  toggleFavorite,
  singleColumn,
  showBanner,
  type = "home",
}) {
  return (
    <div
      className={`grid gap-6 ${singleColumn ? "grid-cols-1" : "sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"}`}
    >
      {stores.length > 0 ? (
        stores.map((store, index) => (
          <React.Fragment key={store.id}>
            {showBanner && index != 0 && index % 6 === 0 && (
              <div className="sm:col-span-full lg:hidden">
                <BannerPromo title="Confira nossas ofertas especiais!" />
              </div>
            )}
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
