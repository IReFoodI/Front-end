import ilustra from "@/ui/assets/ilustra.png"

import { useStores } from "../hooks/useStores"
import { StoresGrid } from "./StoresGrid"

export function Favorites() {
  const { stores, loading, toggleFavorite } = useStores()
  const favoriteStores = stores.filter((store) => store.isFavorited)

  return (
    <div className="flex h-full">
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <StoresGrid
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
