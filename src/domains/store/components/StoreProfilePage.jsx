import {
  IconArrowLeft,
  IconClock,
  IconHeart,
  IconHeartFilled,
  IconInfoCircle,
  IconStarFilled,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { useFavorites } from "@/domains/user/components/favorites/FavoritesData"
import { Loading } from "@/ui/components/ui/loading"

import { useRestaurant } from "../hooks/useRestaurant"
import { StoreHourDayOfWeek } from "./StoreHourDayOffWeek"
import { StoreProductList } from "./StoreProductList"
import { StoreProfilePageTopDesktop } from "./StoreProfilePageTopDesktop"

export function UserStoreProfilePage() {
  const { storeId } = useParams()
  const { stores, toggleFavorite } = useFavorites()
  const [currentStoreWithFavorite, setCurrentStoreWithFavorite] = useState(null)
  const navigation = useNavigate()
  const {
    loadingRestaurant,
    loadingHoursToday,
    loadingRestaurantAddress,
    restaurantData,
    restaurantAllHoursData,
    restaurantAddressesData,
  } = useRestaurant()

  useEffect(() => {
    if (stores) {
      setCurrentStoreWithFavorite(
        stores?.find((s) => s.restaurant.restaurantId == storeId)
      )
    }
  }, [stores])

  if (loadingRestaurant) return <Loading />

  return (
    <div
      id="page"
      className="mx-auto w-full min-w-80 max-w-[1280px] text-gray-500 antialiased xl:py-8"
    >
      <div
        id="capa"
        className="relative h-[200px] w-full rounded-[14px] bg-cover bg-center px-5 xl:hidden"
        style={{ backgroundImage: `url(${restaurantData?.urlBanner})` }}
      >
        <div
          onClick={() => navigation(-1)}
          className="relative top-9 cursor-pointer transition duration-300 hover:text-primary"
        >
          <IconArrowLeft />
        </div>
        <button
          className="relative top-32 h-24 w-24 transform rounded-full bg-cover transition-transform duration-300 hover:scale-105"
          style={{ backgroundImage: `url(${restaurantData?.urlLogo})` }}
        />
      </div>
      <div className="px-5 pb-5 xl:px-0">
        <div
          id="icons-mobile"
          className="flex justify-end gap-2 py-3 text-gray-400 xl:hidden"
        >
          <Link to={`/loja/informacoes/${storeId}`}>
            <IconInfoCircle className="cursor-pointer transition duration-300 hover:text-orange-600" />
          </Link>
          <button
            onClick={() =>
              toggleFavorite(storeId, currentStoreWithFavorite?.favoriteId)
            }
          >
            {currentStoreWithFavorite?.isFavorited ? (
              <IconHeartFilled className="cursor-pointer text-orange-600 transition duration-300" />
            ) : (
              <IconHeart className="cursor-pointer transition duration-300 hover:text-orange-600" />
            )}
          </button>
        </div>
        <div id="cards-mobile" className="flex flex-col gap-5 xl:hidden">
          <div id="card-info">
            <div id="card-content" className="flex flex-col gap-1">
              <div className="cursor-pointer text-2xl font-bold text-gray-700 transition duration-300 hover:text-primary">
                {restaurantData?.fantasy}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-primary">novo!</span>
                <span className="font-semibold text-gray-400">
                  {restaurantData?.category}
                </span>
                <span>
                  <IconStarFilled size={14} className="text-primary" />
                </span>
                <span className="font-bold">
                  {restaurantData?.averageRating} (
                  {restaurantData?.totalEvaluations} avaliações)
                </span>
              </div>
              <button className="flex items-center gap-2 text-sm text-gray-400">
                <span>
                  <IconClock size={15} className="text-gray-500" />
                </span>
                {loadingHoursToday ? (
                  <Loading />
                ) : (
                  <span className="transition duration-300 hover:text-primary">
                    <StoreHourDayOfWeek
                      restaurantHoursTodayData={restaurantAllHoursData}
                    />
                  </span>
                )}
              </button>
            </div>
          </div>
          <div id="card-address">
            {loadingRestaurantAddress ? (
              <Loading />
            ) : (
              <div id="content" className="text-gray-700">
                <p className="font-bold">
                  {restaurantAddressesData?.[0]?.street},{" "}
                  {restaurantAddressesData?.[0]?.number}
                </p>
                <p className="font-bold">
                  {restaurantAddressesData?.[0]?.district} -{" "}
                  {restaurantAddressesData?.[0]?.city} -{" "}
                  {restaurantAddressesData?.[0]?.state}
                </p>
              </div>
            )}
          </div>
        </div>
        <StoreProfilePageTopDesktop
          restaurantData={restaurantData}
          restaurantAllHoursData={restaurantAllHoursData}
        />
        <StoreProductList />
      </div>
    </div>
  )
}
