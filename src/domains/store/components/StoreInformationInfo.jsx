import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconMapPin,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { cnpjFormatter } from "@/app/utils/cnpjFormatter"
import { Loading } from "@/ui/components/ui/loading"

import { useAddressUserStoreProfile } from "../hooks/useAddressUserStoreProfile"
import { useRestaurant } from "../hooks/useRestaurant"

export function StoreInformationInfo() {
  const { restaurant, restaurantHours, restaurantHoursToday } = useRestaurant()
  const { address, isLoading } = useAddressUserStoreProfile()

  console.log("Dados do restaurante: ", restaurant)
  console.log("Dados do endereço:", address)

  const [restaurantHourToday, setRestaurantHourToday] = useState({})
  useEffect(() => {
    restaurantHoursToday.forEach((res) => {
      res.restaurantId === 1 && setRestaurantHourToday(res)
    })
  }, [restaurantHoursToday])

  const [isShowing, setIsShowing] = useState(false)

  const addressCompleteStore = `${address.street}, ${address.number} - ${address.district}, ${address.city} - ${address.state}, ${address.cep}`

  const encodedAddress = encodeURIComponent(addressCompleteStore)

  const toggleAccordion = () => {
    setIsShowing(!isShowing)
  }

  const todayIndex = new Date().getDay() - 1
  const now = new Date()
  const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`
  console.log("Dia de Hoje: " + todayIndex)

  const isOpen = () => {
    if (
      currentTime < restaurantHourToday.openingTime ||
      currentTime > restaurantHourToday.closingTime
    ) {
      return false
    }
    return true
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div id="info" className="flex flex-col gap-8 text-gray-500 antialiased">
      {!isLoading && (
        <>
          {restaurant.restaurantDescription !== null ? (
            <div id="description">
              <h2 className="font-bold">Descrição da Loja</h2>
              <p className="py-2 text-sm">{restaurant.restaurantDescription}</p>
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
                <span className={isOpen() ? "text-green-500" : "text-red-500"}>
                  {isOpen() ? "Open" : "Close"}
                </span>
                {isShowing ? (
                  <IconCaretUpFilled size={24} />
                ) : (
                  <IconCaretDownFilled size={24} />
                )}
              </button>
              <div className="flex justify-between pt-2 text-sm">
                {restaurantHourToday.restaurantId === 1 && (
                  <span>{restaurantHourToday.dayOfWeek}</span>
                )}
                <span>
                  {restaurantHourToday.openingTime} -{" "}
                  {restaurantHourToday.closingTime}
                </span>
              </div>
              <div
                className={`overflow-hidden pb-2 text-sm transition-all duration-1000 ${isShowing ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                {restaurantHours.map((day, index) =>
                  index !== todayIndex ? (
                    <div key={index} className="flex justify-between">
                      <span>{day.dayOfWeek}</span>
                      <span>
                        {day.openingTime} - {day.closingTime}
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
              <iframe
                title="Google Maps"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div id="other-info">
            <h2 className="font-bold">Outras Informações</h2>
            <p className="py-2 text-sm">
              CNPJ: {cnpjFormatter(restaurant.cnpj)}
            </p>
          </div>
        </>
      )}
    </div>
  )
}
