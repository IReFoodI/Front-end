import { StoreCard } from "./StoreCard"

export function StoresGrid({
  stores,
  toggleFavorite,
  singleColumn,
  // type = "home",
  // hasLoadedOnce,
}) {
  return (
    <div
      className={`grid gap-6 ${
        singleColumn ? "grid-cols-1" : "sm:grid-cols-2 xl:grid-cols-3"
      }`}
    >
      {stores.map((store) => (
        <StoreCard
          key={store.restaurant.restaurantId}
          storeData={store}
          onFavoriteToggle={() =>
            toggleFavorite(store.restaurant.restaurantId, store.favoriteId)
          }
        />
      ))}
    </div>
  )
}
