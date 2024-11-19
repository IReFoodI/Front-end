import { IconMoodSad } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"

import { useStores } from "@/domains/user/components/storesHome/StoresData"
import { NotFound } from "@/ui/components/NotFound"
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
      <h1 className="mt-10 w-full pb-6 text-2xl font-semibold">
        Lojas disponíveis hoje
      </h1>

      {/* Mostrar Loading enquanto carregando */}
      {loading && !hasLoadedOnce ? (
        <Loading />
      ) : stores.length === 0 && hasLoadedOnce ? (
        mostrarDiv && (
          <NotFound
            Icon={IconMoodSad}
            title={
              "Infelizmente não encontramos nenhuma loja aberta na sua região"
            }
            description={
              "Não fique triste, em breve teremos lojas na sua região"
            }
          />
        )
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
