import { useLojas } from "../../hooks/useLojas"
import { LojasGrid } from "../LojasGrid"

export function Favoritos() {
  const { lojas, loading, toggleFavorite } = useLojas()
  const lojasFavoritas = lojas.filter((loja) => loja.isFavorited)

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <LojasGrid
          lojas={lojasFavoritas}
          toggleFavorite={toggleFavorite}
          showBanner={false}
        />
      )}
    </>
  )
}
