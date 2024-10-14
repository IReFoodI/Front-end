import { useStores } from "@/domains/user/hooks/useStores"

import { BannerPromo } from "./BannerPromo"
import { StoresGrid } from "./StoresGrid"

export function Home() {
  const { stores, loading, toggleFavorite } = useStores()

  return (
    <>
      <div className="lg:min-h52 my-10 hidden lg:left-0 lg:top-0 lg:z-10 lg:block lg:w-full">
        <BannerPromo title="Confira nossas ofertas especiais!" />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <StoresGrid
          stores={stores}
          toggleFavorite={toggleFavorite}
          showBanner={true}
        />
      )}
    </>
  )
}
