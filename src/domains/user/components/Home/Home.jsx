import { useLojas } from "../../hooks/useLojas"
import { LojasGrid } from "../LojasGrid"
import { BannerPromo } from "./BannerPromo"

export function Home() {
  const { lojas, loading, toggleFavorite } = useLojas()

  return (
    <>
      <div className="my-10 hidden lg:left-0 lg:top-0 lg:z-10 lg:block lg:h-[300px] lg:w-full">
        <BannerPromo title="Confira nossas ofertas especiais!" />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <LojasGrid
          lojas={lojas}
          toggleFavorite={toggleFavorite}
          showBanner={true}
        />
      )}
    </>
  )
}
