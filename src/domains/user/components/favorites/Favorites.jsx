import { useStores } from "@/domains/user/hooks/useStores"

import { StoresGrid } from "../storesHome/StoresGrid"

export function Favorites() {
  const { stores, loading, toggleFavorite } = useStores()
  const favoriteStores = stores.filter((store) => store.isFavorited)

  return (
    <>
      <h1 className="fixed left-1/2 -translate-x-1/2 transform text-center text-2xl font-semibold">
        Favoritos
      </h1>
      <div className="flex h-full pt-24">
        <div className="mx-auto lg:mx-20">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <StoresGrid
              stores={favoriteStores}
              toggleFavorite={toggleFavorite}
              singleColumn={true}
              type="favorites"
            />
          )}
        </div>
      </div>
    </>
  )
}
