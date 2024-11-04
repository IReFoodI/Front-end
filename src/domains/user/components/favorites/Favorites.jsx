import { IconHeart } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

import { useFavorites } from "@/domains/user/components/favorites/FavoritesData"
import { Button } from "@/ui/components/ui/button/button"
import { Loading } from "@/ui/components/ui/loading"

import { StoresGrid } from "../storesHome/StoresGrid"

export function Favorites() {
  const { stores, loading, toggleFavorite, loadMoreStores } = useFavorites()
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)
  const favoriteStores = stores.filter((store) => store.isFavorited)
  const sentinelRef = useRef(null)

  useEffect(() => {
    if (!loading) {
      setHasLoadedOnce(true)
    }
  }, [loading])

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
  }, [loading, loadMoreStores])
  console.log(favoriteStores.length)
  console.log(hasLoadedOnce)
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
          <div className="flex flex-col items-center space-y-4 text-center">
            <IconHeart className="h-12 w-12 text-gray-400" />
            <h1 className="text-lg font-bold text-secondary-foreground">
              Você ainda não favoritou nenhuma empresa!
            </h1>
            <p className="w-2/3 text-muted-foreground">
              Explore as lojas e tire a barriga da miséria hoje mesmo!
            </p>
            <Button
              to="/"
              className="rounded-md bg-primary px-6 py-4 text-primary-foreground shadow hover:bg-primary/90"
            >
              <Link to="/" className="w-full">
                Explorar agora!
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex h-full pt-24">
          <div className="mx-auto custom:mx-12 md:mx-24 lg:mx-0 xl:mx-20">
            <StoresGrid
              stores={favoriteStores}
              toggleFavorite={toggleFavorite}
              singleColumn={true}
              type="favorites"
              hasLoadedOnce={hasLoadedOnce}
            />
            <div ref={sentinelRef} className="h-8"></div>
          </div>
        </div>
      )}
    </div>
  )
}
