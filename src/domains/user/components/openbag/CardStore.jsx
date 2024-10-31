import {
  IconHeart,
  IconHeartFilled,
  IconInfoCircle,
  IconStarFilled,
} from "@tabler/icons-react"
import { useState } from "react"

import logo from "./logo-loja.png"
const CardStore = ({ store }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false)

  const toggleHeart = () => {
    setIsHeartFilled((prevState) => !prevState)
  }

  //const logoPath = store.imagePath

  return (
    <div
      id="card-desktop"
      className="flex max-w-[550px] gap-5 rounded-[14px] bg-white"
    >
      <button
        id="logo"
        className="h-28 w-28 transform rounded-full bg-cover transition-transform duration-300 hover:scale-105"
        style={{ backgroundImage: `url(${logo})` }}
      />
      <div id="info" className="ms-[-10px] flex-1 py-3 pe-3">
        <div className="flex justify-between">
          <button className="text-2xl font-bold text-gray-700 transition duration-300 hover:text-primary">
            Dragão Verde
            {/* {store.name} */}
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
          <span className="text-sm 2xl:text-base">
            {/* {store.rating} */}4.5,0 (10 avaliações)
          </span>
          <span className="text-sm text-gray-400 2xl:text-base">
            Restaurante
            {/* {store.type} */}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CardStore
