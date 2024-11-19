import { IconHeart } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"

import { useFavorites } from "@/domains/user/components/favorites/FavoritesData"
import { NotFound } from "@/ui/components/NotFound"
import { Loading } from "@/ui/components/ui/loading"

import { StoresGrid } from "../storesHome/StoresGrid"

export function Favorites() {
  const { stores, loading, toggleFavorite, loadMoreStores } = useFavorites()
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)
  const favoriteStores = stores.filter((store) => store.isFavorited)
  const [mostrarDiv, setMostrarDiv] = useState(false)

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
      <h1 className="fixed left-1/2 -translate-x-1/2 transform text-center text-2xl font-semibold">
        Favoritos
      </h1>

      {loading && !hasLoadedOnce ? (
        <div className="flex h-full pt-32">
          <Loading />
        </div>
      ) : favoriteStores.length === 0 && hasLoadedOnce ? (
        <div className="flex h-screen/2 items-center justify-center">
          {mostrarDiv && (
            <NotFound
              Icon={IconHeart}
              title={"Você ainda não favoritou nenhuma empresa!"}
              description={
                "Explore as lojas e tire a barriga da miséria hoje mesmo!"
              }
              linkTo={"/"}
              textButton={"Explorar agora!"}
            />
          )}
        </div>
      ) : (
        <div className="flex h-full pt-24">
          <div className="mx-auto custom:mx-12 md:mx-24 lg:mx-0 xl:mx-20">
            <StoresGrid
              stores={favoriteStores}
              toggleFavorite={toggleFavorite}
              singleColumn={true}
              hasLoadedOnce={hasLoadedOnce}
            />
            <div ref={sentinelRef} className="h-8"></div>
          </div>
        </div>
      )}
    </div>
  )
}
