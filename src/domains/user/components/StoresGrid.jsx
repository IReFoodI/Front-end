import React from "react"

import { BannerPromo } from "./BannerPromo"
import { StoreCard } from "./StoreCard"

export function StoresGrid({
  stores,
  toggleFavorite,
  showBanner,
  singleColumn,
}) {
  return (
    <div
      className={`grid gap-6 px-4 ${singleColumn ? "grid-cols-1" : "sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"}`}
    >
      {stores.length > 0 ? (
        stores.map((store, index) => (
          <React.Fragment key={store.id}>
            {showBanner && index % 6 === 0 && (
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
      ) : (
        <p className="col-span-full text-center">Nenhuma store disponível.</p>
      )}
    </div>
  )
}
