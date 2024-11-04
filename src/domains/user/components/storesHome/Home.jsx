import { useEffect, useRef } from "react"

import { useStores } from "@/domains/user/components/storesHome/StoresData"

import { BannerCarousel } from "./BannerCarousel"
import { StoresGrid } from "./StoresGrid"

export function Home() {
  const { stores, loading, toggleFavorite, loadMoreStores } = useStores()
  const sentinelRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreStores()
        }
      },
      { threshold: 0.1 } // Trigger when 10% of sentinel is visible
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current)
      }
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
      {!loading && stores.length === 0 && <p>No stores found.</p>}
      {/* Render StoresGrid */}
      <StoresGrid stores={stores} toggleFavorite={toggleFavorite} />

      {/* Sentinel element at the end of the page */}
      <div ref={sentinelRef} className="py-2"></div>
    </div>
  )
}
