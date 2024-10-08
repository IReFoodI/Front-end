import ilustra from "@/ui/assets/ilustra.png"

import { usestores } from "../hooks/usestores"
import { StoreGrid } from "./StoresGrid"

export function Favoritos() {
  const { stores, loading, toggleFavorite } = usestores()
  const favoriteStores = stores.filter((store) => store.isFavorited)

  return (
    <div className="flex h-full">
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <StoreGrid
            stores={favoriteStores}
            toggleFavorite={toggleFavorite}
            showBanner={false}
            singleColumn={true}
          />
        )}
      </div>
      <div className="hidden lg:flex">
        <img className="max-h-[700px]" src={ilustra} alt="" />
      </div>
    </div>
  )
}
