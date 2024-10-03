import ilustra from "@/ui/assets/ilustra.png"

import { useLojas } from "../hooks/useLojas"
import { LojasGrid } from "./LojasGrid"

export function Favoritos() {
  const { lojas, loading, toggleFavorite } = useLojas()
  const lojasFavoritas = lojas.filter((loja) => loja.isFavorited)

  return (
    <div className="flex h-full">
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <LojasGrid
            lojas={lojasFavoritas}
            toggleFavorite={toggleFavorite}
            showBanner={false}
            singleColumn={true}
          />
        )}
      </div>
      <div className="hidden lg:flex">
        <img className="max-h-[700px]" src={ilustra} alt="" />
      </div>
    </div>
  )
}
