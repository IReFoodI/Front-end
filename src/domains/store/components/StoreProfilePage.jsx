import {
  IconArrowLeft,
  IconClock,
  IconHeart,
  IconHeartFilled,
  IconInfoCircle,
  IconStarFilled,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate, useParams } from "react-router-dom"

import { useFavorites } from "@/domains/user/components/favorites/FavoritesData"
import { Loading } from "@/ui/components/ui/loading"

import { useRestaurant } from "../hooks/useRestaurant"
import { StoreHourDayOfWeek } from "./StoreHourDayOffWeek"

export function UserStoreProfilePage() {
  const { storeId } = useParams()
  const { stores, toggleFavorite } = useFavorites()
  const [currentStoreWithFavorite, setCurrentStoreWithFavorite] = useState(null)
  const navigation = useNavigate()
  const {
    loadingRestaurant,
    loadingHoursToday,
    // loadingRestaurantAddress,
    restaurantData,
    restaurantAllHoursData,
    // restaurantAddressesData,
  } = useRestaurant()

  useEffect(() => {
    if (stores) {
      setCurrentStoreWithFavorite(
        stores?.find((s) => s.restaurant.restaurantId == storeId)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stores])

  if (loadingRestaurant) return <Loading />

  return (
    <div
      id="page"
      className="mx-auto w-full min-w-80 text-gray-500 antialiased xl:py-8"
    >
      <div
        id="capa"
        className="h-[200px] w-full rounded-lg bg-cover bg-center px-5"
        style={{ backgroundImage: `url(${restaurantData?.urlBanner})` }}
      >
        <div
          onClick={() => navigation("/")}
          className="relative top-9 cursor-pointer transition duration-300 hover:text-primary"
        >
          <IconArrowLeft />
        </div>
      </div>
      <div className="mb-3 items-start justify-between md:flex">
        <div
          id="card-info"
          className="-mt-10 w-full rounded-md bg-cover bg-center md:max-w-[70%] md:bg-card md:pr-5 md:pt-5 lg:max-w-[50%]"
        >
          <div
            id="card-content"
            className="flex justify-between gap-3 md:flex-row"
          >
            <div className="gap-2 md:flex">
              <div className="px-5 md:pb-5 xl:px-0">
                <Link to={`/loja/${storeId}`}>
                  <button
                    className="top-20 h-16 w-16 rounded-full bg-cover transition-transform duration-300 hover:scale-105 md:relative md:top-0 md:block md:h-24 md:w-24"
                    style={{
                      backgroundImage: `url(${restaurantData?.urlLogo})`,
                    }}
                  />
                </Link>
              </div>
              <div className="flex flex-col text-sm">
                <h2 className="text-xl font-bold text-gray-700 md:text-xl">
                  {restaurantData?.fantasy}
                </h2>
                {/* <span className="font-bold text-primary">novo!</span> */}
                <span className="font-semibold text-gray-400">
                  {restaurantData?.category}
                </span>
                <div className="flex items-center gap-1">
                  <span>
                    <IconStarFilled size={14} className="text-primary" />
                  </span>
                  <span className="font-bold">
                    {restaurantData?.averageRating} (
                    {restaurantData?.totalEvaluations} avaliações)
                  </span>
                </div>
              </div>
            </div>
            <menu className="flex items-start pt-12 md:p-0">
              <Link to={`/loja/${storeId}/informacoes/`}>
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
            </menu>
          </div>
        </div>
        <button className="flex items-center gap-2 text-sm text-gray-400 md:p-2">
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
      {/* <div className="md:mb-8" id="card-address">
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
      </div> */}
      <Outlet />
    </div>
  )
}
