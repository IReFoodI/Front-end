import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconMapPin,
} from "@tabler/icons-react"
import { add } from "date-fns"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { cnpjFormatter } from "@/app/utils/cnpjFormatter"
import { Loading } from "@/ui/components/ui/loading"

import { useAddressUserStoreProfile } from "../hooks/useAddressUserStoreProfile"
import { useRestaurant } from "../hooks/useRestaurant"

export function StoreInformationInfo() {
  const { restaurants, restaurantHours, restaurantHoursToday } = useRestaurant()
  const { address, isLoading } = useAddressUserStoreProfile()

  const [restaurantWithStoreId, setRestaurantWithStoreId] = useState([])
  const [addressRestaurantWithStoreId, setAddressRestaurantWithStoreId] = useState([])
  const [restaurantHourToday, setRestaurantHourToday] = useState([])
  const [restaurantHour, setRestaurantHour] = useState([])

  const { storeId } = useParams()

  useEffect(() => {
    restaurants.forEach((res) => {
      if (res.restaurantId == storeId) {
        setRestaurantWithStoreId(res)
      }
    })
  }, [restaurants, storeId])

  useEffect(() => {
    address.forEach((add) => {
      if (
        add.addressType === "RESTAURANT" ||
        (add.restaurantId === storeId &&
          add.addressId === add.associatedOrderId)
      ) {
        setAddressRestaurantWithStoreId(add)
      }
    })
  }, [address, storeId])

  useEffect(() => {
    restaurantHoursToday.forEach((resHourToday) => {
      if (resHourToday.restaurantId == storeId) {
        setRestaurantHourToday(resHourToday)
      }
    })
  }, [restaurantHoursToday, storeId])

  useEffect(() => {
    restaurantHours.forEach((resHours) => {
      if (resHours.restaurantId == storeId) {
        setRestaurantHour((prevResHours) => [...prevResHours, resHours])
      }
    })
  }, [restaurantHours, storeId])

  const [isShowing, setIsShowing] = useState(false)

  const addressCompleteStore = `${addressRestaurantWithStoreId.street}, ${addressRestaurantWithStoreId.number} - ${addressRestaurantWithStoreId.district}, ${addressRestaurantWithStoreId.city} - ${addressRestaurantWithStoreId.state}, ${addressRestaurantWithStoreId.cep}`

  const encodedAddress = encodeURIComponent(addressCompleteStore)

  const toggleAccordion = () => {
    setIsShowing(!isShowing)
  }

  const todayIndex = new Date().getDay() - 1
  const now = new Date()
  const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`

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
          {restaurantWithStoreId.restaurantDescription !== null ? (
            <div id="description">
              <h2 className="font-bold">Descrição da Loja</h2>
              <p className="py-2 text-sm">
                {restaurantWithStoreId.restaurantDescription}
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
                {restaurantHourToday.restaurantId == storeId && (
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
                {restaurantHour.map((day, index) =>
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
            <p className="py-2 text-sm">CNPJ: {restaurantWithStoreId.cnpj}</p>
          </div>
        </>
      )}
    </div>
  )
}
