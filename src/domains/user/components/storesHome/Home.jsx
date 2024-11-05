import { useStores } from "@/domains/user/components/storesHome/StoresData"

import { BannerCarousel } from "./BannerCarousel"
import { StoresGrid } from "./StoresGrid"

export function Home() {
  const { stores, loading, toggleFavorite } = useStores()

  return (
    <>
      <div className="my-6">
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
