import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconMapPin,
} from "@tabler/icons-react"
import { useState } from "react"

export const StoreInformationInfo = () => {
  const [isShowing, setIsShowing] = useState(false)
  const address =
    "Rua Visconde de Duprat, 258 - Petrópolis, Porto Alegre - RS, 90690-430"
  const encodedAddress = encodeURIComponent(address)

  const toggleAccordion = () => {
    setIsShowing(!isShowing)
  }

  const daysOfWeek = [
    {
      day: "Domingo",
      hours: "10:00 - 23:59",
      open: "10:00",
      close: "23:59",
    },
    {
      day: "Segunda-feira",
      hours: "10:00 - 00:50",
      open: "10:00",
      close: "00:50",
    },
    {
      day: "Terça-feira",
      hours: "09:00 - 18:00",
      open: "09:00",
      close: "18:00",
    },
    {
      day: "Quarta-feira",
      hours: "09:00 - 18:00",
      open: "09:00",
      close: "18:00",
    },
    {
      day: "Quinta-feira",
      hours: "09:00 - 18:00",
      open: "09:00",
      close: "18:00",
    },
    {
      day: "Sexta-feira",
      hours: "09:00 - 18:00",
      open: "09:00",
      close: "18:00",
    },
    { day: "Sábado", hours: "10:00 - 14:00", open: "10:00", close: "14:00" },
  ]

  const todayIndex = new Date().getDay()
  const now = new Date()
  const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`

  const todayHours = daysOfWeek[todayIndex]

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes
  }

  const isOpen = () => {
    if (!todayHours.open || !todayHours.close) {
      return false
    }

    const currentMinutes = timeToMinutes(currentTime)
    const openMinutes = timeToMinutes(todayHours.open)
    const closeMinutes = timeToMinutes(todayHours.close)

    if (openMinutes > closeMinutes) {
      return currentMinutes >= openMinutes || currentMinutes <= closeMinutes
    } else {
      return currentMinutes >= openMinutes && currentMinutes <= closeMinutes
    }
  }

  return (
    <div id="info" className="flex flex-col gap-8 text-gray-500 antialiased">
      <div id="description">
        <h2 className="font-bold">Descrição da Loja</h2>
        <p className="py-2 text-sm">
          Aqui vai a descrição da loja, criada no ano de 1998 no bairro tal.
        </p>
      </div>
      <div id="status">
        <div id="accordion">
          <button
            onClick={toggleAccordion}
            className="flex w-full items-center justify-between rounded-full bg-gray-100 px-2 text-left font-bold"
          >
            <span className={isOpen() ? "text-green-500" : "text-red-500"}>
              {isOpen() ? "Aberto agora" : "Fechado"}
            </span>
            {isShowing ? (
              <IconCaretUpFilled size={24} />
            ) : (
              <IconCaretDownFilled size={24} />
            )}
          </button>
          <div className="flex justify-between pt-2 text-sm">
            <span>{daysOfWeek[todayIndex].day}</span>
            <span>{daysOfWeek[todayIndex].hours}</span>
          </div>
          <div
            className={`overflow-hidden pb-2 text-sm transition-all duration-1000 ${isShowing ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            {daysOfWeek.map((day, index) =>
              index !== todayIndex ? (
                <div key={index} className="flex justify-between">
                  <span>{day.day}</span>
                  <span>{day.hours}</span>
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
          <p className="py-2 text-sm">{address}</p>
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
        <p className="py-2 text-sm">CNPJ: 33.123.123/0001-00</p>
      </div>
    </div>
  )
}
