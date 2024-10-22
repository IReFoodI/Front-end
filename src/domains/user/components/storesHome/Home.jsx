import { useStores } from "@/domains/user/hooks/useStores"

import { BannerCarousel } from "./BannerCarousel"
import { StoresGrid } from "./StoresGrid"

export function Home() {
  const { stores, loading, toggleFavorite } = useStores()

  return (
    <>
      <div className="lg:min-h52 mb-2 lg:left-0 lg:top-0 lg:z-10 lg:block lg:w-full">
        <BannerCarousel />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <StoresGrid stores={stores} toggleFavorite={toggleFavorite} />
      )}
    </>
  )
}
