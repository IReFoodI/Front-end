import { useStores } from "@/domains/user/hooks/useStores"

import { StoresGrid } from "../storesHome/StoresGrid"

export function Favorites() {
  const { stores, loading, toggleFavorite } = useStores()
  const favoriteStores = stores.filter((store) => store.isFavorited)

  return (
    <>
      <h1 className="col-span-full w-full pb-6 text-center text-2xl font-semibold">
        Alterar Dados
      </h1>
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
              type="favorites"
            />
          )}
        </div>
      </div>
    </>
  )
}
