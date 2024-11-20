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
import { Button } from "@/ui/components/ui/button/button"
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

    restaurantData,
    restaurantAllHoursData,
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
      <div className="relative w-full overflow-hidden rounded-lg object-cover sm:h-[200px]">
        <img id="capa" className="w-full" src={restaurantData?.urlBanner}></img>
        <Button
          variant="ghost"
          onClick={() => navigation("/")}
          className="absolute top-9 ml-4 bg-white/50"
        >
          <IconArrowLeft />
        </Button>
      </div>
      <div className="relative mb-3 items-start justify-between px-2 md:flex">
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
        <button className="flex cursor-default items-center gap-2 text-sm text-gray-400 md:p-2">
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
      <Outlet />
    </div>
  )
}
