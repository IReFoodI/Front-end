import { useEffect } from "react"

import { useStores } from "@/domains/user/components/storesHome/StoresData"

import { BannerCarousel } from "./BannerCarousel"
import { StoresGrid } from "./StoresGrid"

export function Home() {
  const { stores, loading, toggleFavorite, loadMoreStores } = useStores()

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight + 0 && // Check if close to bottom
        !loading
      ) {
        console.log("load more")
        loadMoreStores()
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [loadMoreStores, loading])
  return (
    <div
      className={`transition-opacity duration-300 ${loading ? "opacity-50" : "opacity-100"}`}
    >
      <div className="my-6">
        <BannerCarousel />
      </div>
      {loading && <p>Loading...</p>}
      {!loading && stores.length === 0 && <p>No stores found.</p>}{" "}
      {/* Handle no stores case */}
      <StoresGrid stores={stores} toggleFavorite={toggleFavorite} />
    </div>
  )
}
