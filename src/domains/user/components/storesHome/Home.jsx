import { IconMoodSad } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"

import { useStores } from "@/domains/user/components/storesHome/StoresData"
import { Loading } from "@/ui/components/ui/loading"

import { BannerCarousel } from "./BannerCarousel"
import { StoresGrid } from "./StoresGrid"

export function Home() {
  const { stores, loading, toggleFavorite, loadMoreStores } = useStores()
  const [mostrarDiv, setMostrarDiv] = useState(false)

  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)
  const sentinelRef = useRef(null)
  useEffect(() => {
    if (!loading) {
      setHasLoadedOnce(true)
      const timer = setTimeout(() => {
        setMostrarDiv(true)
      }, 500)
      return () => clearTimeout(timer)
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

    const currentSentinel = sentinelRef.current
    if (currentSentinel) {
      observer.observe(currentSentinel)
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel)
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

      {/* Mostrar Loading enquanto carregando */}
      {loading && !hasLoadedOnce ? (
        <Loading />
      ) : stores.length === 0 && hasLoadedOnce ? (
        <div className="flex h-full w-full items-center justify-center">
          {mostrarDiv && (
            <div className="flex flex-col items-center space-y-4 text-center">
              <IconMoodSad className="h-12 w-12 text-muted-foreground" />
              <h1 className="text-lg font-bold text-muted-foreground">
                Infelizmente não encontramos nenhuma loja aberta na sua região
              </h1>
            </div>
          )}
        </div>
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
