import React from "react"

import { CardLoja } from "./CardLoja"
import { BannerPromo } from "./Home/BannerPromo"

export function LojasGrid({ lojas, toggleFavorite, showBanner }) {
  return (
    <div className="grid gap-6 px-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
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
