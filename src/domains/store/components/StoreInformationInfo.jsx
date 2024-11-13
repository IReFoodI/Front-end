import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconMapPin,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { Loading } from "@/ui/components/ui/loading"

import { useRestaurant } from "../hooks/useRestaurant"
import { StoreHourDayOfWeek } from "./StoreHourDayOffWeek"

export const DAY_OF_WEEK_TODAY = {
  MONDAY: "Segunda-feira",
  TUESDAY: "Terça-feira",
  WEDNESDAY: "Quarta-feira",
  THURSDAY: "Quinta-feira",
  FRIDAY: "Sexta-feira",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
}

export function StoreInformationInfo() {
  const {
    loadingRestaurant,
    restaurantData,
    loadingRestaurantAddress,
    restaurantAddressesData,
    restaurantHoursTodayData,
    restaurantAllHoursData,
  } = useRestaurant()

  const [encodedAddress, setEncodeAddress] = useState("")
  const [addressCompleteStore, setAddressCompleteStore] = useState("")
  const [isShowing, setIsShowing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const todayIndex = new Date().getDay() - 1

  const toggleAccordion = () => {
    setIsShowing(!isShowing)
  }

  useEffect(() => {
    const now = new Date()
    const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`
    setIsOpen(
      !(
        currentTime < restaurantHoursTodayData?.openingTime ||
        currentTime > restaurantHoursTodayData?.closingTime
      )
    )
  }, [restaurantHoursTodayData])

  useEffect(() => {
    if (restaurantAddressesData) {
      const [addressRestaurantWithStoreId] = restaurantAddressesData
      setAddressCompleteStore(
        `${addressRestaurantWithStoreId.street}, ${addressRestaurantWithStoreId.number} - ${addressRestaurantWithStoreId.district}, ${addressRestaurantWithStoreId.city} - ${addressRestaurantWithStoreId.state}, ${addressRestaurantWithStoreId.cep}`
      )
      setEncodeAddress(encodeURIComponent(addressCompleteStore))
    }
  }, [addressCompleteStore, restaurantAddressesData])

  if (loadingRestaurant) {
    return <Loading />
  }

  return (
    <div
      id="info"
      className="mt-8 flex flex-col gap-8 text-gray-500 antialiased"
    >
      {!loadingRestaurant && (
        <>
          {restaurantData?.description !== null ? (
            <div id="description">
              <h2 className="font-bold">Descrição da Loja</h2>
              <p className="py-2 text-sm">
                {restaurantData?.description ?? "Loja não possui descrição."}
              </p>
            </div>
          ) : (
            ""
          )}
          <div id="status">
            <div id="accordion">
              <button
                onClick={toggleAccordion}
                className="flex w-full items-center justify-between rounded-full bg-gray-100 px-2 text-left font-bold"
              >
                <span className={isOpen ? "text-green-500" : "text-red-500"}>
                  {isOpen ? "Aberto" : "Fechado"}
                </span>
                {isShowing ? (
                  <IconCaretUpFilled size={24} />
                ) : (
                  <IconCaretDownFilled size={24} />
                )}
              </button>
              <div className="flex justify-between pt-2 text-sm font-medium">
                <StoreHourDayOfWeek
                  restaurantHoursTodayData={restaurantAllHoursData}
                />
              </div>
              <div
                className={`overflow-hidden pb-2 text-sm transition-all duration-1000 ${isShowing ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                {restaurantAllHoursData?.map((day, index) =>
                  index !== todayIndex ? (
                    <div key={index} className="flex justify-between">
                      <span>{DAY_OF_WEEK_TODAY[day.dayOfWeek]}</span>
                      <span>
                        {day.openingTime}h - {day.closingTime}h
                      </span>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
          <div id="address">
            <h2 className="font-bold">Endereço</h2>
            <div className="flex items-center gap-2 py-2">
              <span>
                <IconMapPin size={25} />
              </span>
              <p className="py-2 text-sm">{addressCompleteStore}</p>
            </div>
            <div className="flex h-[200px] items-center justify-center bg-gray-100">
              {loadingRestaurantAddress ? (
                <Loading />
              ) : (
                <iframe
                  title="Google Maps"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
