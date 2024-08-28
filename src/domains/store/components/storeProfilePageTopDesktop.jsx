import {
  IconClock,
  IconHeart,
  IconHeartFilled,
  IconInfoCircle,
  IconMapPin,
  IconStarFilled,
} from "@tabler/icons-react"
import { useState } from "react"

import capa from "./capa.png"
import logo from "./logo-loja.png"

export function StoreProfilePageTopDesktop() {
  const [isHeartFilled, setIsHeartFilled] = useState(false)

  const toggleHeart = () => {
    setIsHeartFilled((prevState) => !prevState)
  }

  return (
    <div className="text-gray-500 antialiased">
      <div
        id="capa"
        className="relative hidden h-[200px] w-full bg-cover bg-center px-5 xl:flex xl:rounded-[14px]"
        style={{ backgroundImage: `url(${capa})` }}
      ></div>
      <div
        id="icons-desktop"
        className="hidden items-center justify-end py-3 xl:flex"
      >
        <button className="flex items-center gap-2">
          <span>
            <IconClock size={15} />
          </span>
          <span className="text-gray-400 transition duration-300 hover:text-primary">
            10:00 às 23:00
          </span>
          <span>
            <IconMapPin size={15} />
          </span>
          <span className="text-gray-400 transition duration-300 hover:text-primary">
            2.5 Km
          </span>
        </button>
      </div>
      <div
        id="card-desktop"
        className="relative bottom-20 ms-8 hidden max-w-[550px] rounded-[14px] bg-white xl:flex"
      >
        <button
          id="logo"
          className="relative bottom-1 right-9 h-36 w-36 transform rounded-full bg-cover transition-transform duration-300 hover:scale-105"
          style={{ backgroundImage: `url(${logo})` }}
        />
        <div id="info" className="ms-[-10px] flex-1 py-3 pe-3">
          <div className="flex justify-between">
            <button className="text-2xl font-bold text-gray-700 transition duration-300 hover:text-primary">
              Dragão Verde
            </button>
            <div id="icons" className="flex justify-end gap-2 text-gray-400">
              <IconInfoCircle className="cursor-pointer transition duration-300 hover:text-primary" />
              <button
                onClick={toggleHeart}
                className="flex transition duration-300 hover:text-primary"
              >
                {isHeartFilled ? (
                  <IconHeartFilled className="cursor-pointer text-primary" />
                ) : (
                  <IconHeart className="cursor-pointer" />
                )}
              </button>
            </div>
          </div>
          <span className="font-semibold text-primary">novo!</span>
          <div className="flex items-center gap-2 font-semibold">
            <span>
              <IconStarFilled size={15} className="text-primary" />
            </span>
            <span>5,0 (10 avaliações)</span>
            <span className="text-gray-400">Restaurante</span>
          </div>
        </div>
      </div>
    </div>
  )
}
