import React from "react"

import { BannerPromo } from "./BannerPromo"
import { CardLoja } from "./CardLoja"

export function LojasGrid({ lojas, toggleFavorite, showBanner, singleColumn }) {
  return (
    <div
      className={`grid gap-6 px-4 ${singleColumn ? "grid-cols-1" : "sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"}`}
    >
      {lojas.length > 0 ? (
        lojas.map((loja, index) => (
          <React.Fragment key={loja.id}>
            <CardLoja
              lojaData={loja}
              onFavoriteToggle={() => toggleFavorite(loja.id)}
            />
            {showBanner && index % 6 === 0 && (
              <div className="sm:col-span-full lg:hidden">
                <BannerPromo title="Confira nossas ofertas especiais!" />
              </div>
            )}
          </React.Fragment>
        ))
      ) : (
        <p className="col-span-full text-center">Nenhuma loja disponível.</p>
      )}
    </div>
  )
}
