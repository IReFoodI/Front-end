import { IconInfoCircle, IconStarFilled } from "@tabler/icons-react"

import { decimalFormatter } from "@/app/utils/decimalFormatter"
import { useFavorites } from "@/domains/user/components/favorites/FavoritesData"

import { FavoriteButton } from "../favorites/FavoriteButton"

const CardStore = ({ restaurantInfo }) => {
  const { stores, toggleFavorite } = useFavorites()

  const store = stores.find(
    (store) => store.restaurant?.restaurantId === restaurantInfo?.restaurantId
  )

  const isFavorited = store ? store.isFavorited : false

  const toggleHeart = () => {
    toggleFavorite(restaurantInfo?.restaurantId, store?.favoriteId)
  }

  // const isNewRestaurant = () => {
  //   if (restaurantInfo?.dateCreation) {
  //     const creationDate = new Date(restaurantInfo.dateCreation)
  //     const today = new Date()

  //     const diffInTime = today - creationDate
  //     const diffInMonths = diffInTime / (1000 * 3600 * 24 * 30)

  //     return diffInMonths <= 2
  //   }
  //   return false
  // }

  // const isNew = isNewRestaurant() ? "novo!" : ".."

  return (
    <div
      id="card-desktop"
      className="flex max-w-[550px] gap-5 rounded-[14px] bg-white"
    >
      <button
        id="logo"
        className="h-28 w-28 transform rounded-full bg-cover bg-center transition-transform duration-300 hover:scale-105"
        style={{ backgroundImage: `url(${restaurantInfo?.urlLogo})` }}
      />
      <div id="info" className="ms-[-10px] flex-1 py-3 pe-3">
        <div className="flex justify-between">
          <button className="text-2xl font-bold text-gray-700 transition duration-300 hover:text-primary">
            {restaurantInfo?.fantasy}
          </button>
          <div
            id="icons"
            className="flex items-center justify-end gap-2 text-gray-400"
          >
            <IconInfoCircle className="cursor-pointer transition duration-300 hover:text-primary" />
            <FavoriteButton isFavorited={isFavorited} onToggle={toggleHeart} />
          </div>
        </div>
        {/* <span className="font-semibold text-primary">{isNew}</span> */}
        <div className="flex items-center gap-2 font-semibold">
          <span>
            <IconStarFilled size={15} className="text-primary" />
          </span>
          <span className="text-sm 2xl:text-base">
            {decimalFormatter(restaurantInfo?.averageRating)} (
            {restaurantInfo?.totalEvaluations} avaliações)
          </span>
          <span className="text-sm text-gray-400 2xl:text-base">
            {restaurantInfo?.category}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CardStore
