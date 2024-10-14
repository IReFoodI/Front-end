import { IconHeart } from "@tabler/icons-react"
import React from "react"
import { Link } from "react-router-dom"

import { Button } from "@/ui/components/ui/button/button"

import { BannerPromo } from "./BannerPromo"
import { StoreCard } from "./StoreCard"

export function StoresGrid({
  stores,
  toggleFavorite,
  showBanner,
  singleColumn,
  type = "home",
}) {
  return (
    <div
      className={`grid gap-6 ${singleColumn ? "grid-cols-1" : "sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"}`}
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
      ) : type === "favorites" ? (
        <div className="flex h-screen/2 items-center justify-center">
          <div className="flex flex-col items-center space-y-4 text-center">
            <IconHeart className="h-12 w-12 text-gray-400" />
            <h1 className="text-lg font-bold text-secondary-foreground">
              Você ainda não favoritou nenhuma empresa!
            </h1>
            <p className="w-2/3 text-muted-foreground">
              Explore as lojas e tire a barriga da miséria hoje mesmo!
            </p>
            <Button
              to="/"
              className="rounded-md bg-primary px-6 py-4 text-primary-foreground shadow hover:bg-primary/90"
            >
              <Link to="/" className="w-full">
                Explorar agora!
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <p className="col-span-full text-center">Nenhuma loja disponível.</p>
      )}
    </div>
  )
}
