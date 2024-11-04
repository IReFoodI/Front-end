import { useEffect, useRef, useState } from "react"

import { useStores } from "@/domains/user/components/storesHome/StoresData"
import { Loading } from "@/ui/components/ui/loading"

import { BannerCarousel } from "./BannerCarousel"
import { StoresGrid } from "./StoresGrid"

export function Home() {
  const { stores, loading, toggleFavorite, loadMoreStores } = useStores()
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)
  const sentinelRef = useRef(null)
  useEffect(() => {
    if (!loading && stores.length > 0) {
      setHasLoadedOnce(true)
    }
  }, [loading, stores])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreStores()
        }
      },
      { threshold: 0.1 }
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
  
  console.log(stores.length)
  console.log(hasLoadedOnce)

  return (
    <div
      className={`transition-opacity duration-300 ${loading ? "opacity-50" : "opacity-100"}`}
    >
      <div className="my-6">
        <BannerCarousel />
      </div>

      {/* Mostrar Loading enquanto carregando */}
      {loading && !hasLoadedOnce ? (
        <Loading />
      ) : stores.length === 0 && hasLoadedOnce ? (
        <p className="col-span-full text-center">Nenhuma loja disponível.</p>
      ) : (
        <StoresGrid
          stores={stores}
          toggleFavorite={toggleFavorite}
          hasLoadedOnce={hasLoadedOnce}
        />
      )}

      {/* Sentinel para carregamento infinito */}
      <div ref={sentinelRef} className="py-2"></div>
    </div>
  )
}
