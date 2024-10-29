import {
  IconArrowLeft,
  IconClock,
  IconHeart,
  IconInfoCircle,
  IconMapPin,
  IconStarFilled,
} from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { useRestaurant } from "../hooks/useRestaurant"
import { StoreProductList } from "./StoreProductList"
import { StoreProfilePageTopDesktop } from "./StoreProfilePageTopDesktop"

export function UserStoreProfilePage() {
  const { restaurant } = useRestaurant()

  const urlBanner = "http://localhost:8080/images/banner.png"
  const urlLogo = "http://localhost:8080/images/logo.png"

  const { fantasy, category, averageRating, totalEvaluations } = restaurant

  return (
    <div
      id="page"
      className="mx-auto w-full min-w-80 max-w-[1280px] text-gray-500 antialiased xl:py-8"
    >
      <div
        id="capa"
        className="relative h-[200px] w-full bg-cover bg-center px-5 xl:hidden xl:rounded-[14px]"
        style={{ backgroundImage: `url(${urlBanner})` }}
      >
        <div className="relative top-9 cursor-pointer transition duration-300 hover:text-primary">
          <IconArrowLeft />
        </div>
        <button
          className="relative top-32 h-24 w-24 transform rounded-full bg-cover transition-transform duration-300 hover:scale-105"
          style={{ backgroundImage: `url(${urlLogo})` }}
        />
      </div>
      <div className="px-5 pb-5 xl:px-0">
        <div
          id="icons-mobile"
          className="flex justify-end gap-2 py-3 text-gray-400 xl:hidden"
        >
          <Link
            to="/loja/informacoes"
            onClick={() => console.log("Link clicado")}
          >
            <IconInfoCircle className="cursor-pointer transition duration-300 hover:text-orange-600" />
          </Link>
          <IconHeart className="cursor-pointer transition duration-300 hover:text-orange-600" />
        </div>
        <div id="cards-mobile" className="flex flex-col gap-5 xl:hidden">
          <div id="card-info">
            <div id="card-content" className="flex flex-col gap-1">
              <div className="cursor-pointer text-2xl font-bold text-gray-700 transition duration-300 hover:text-primary">
                {fantasy}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-primary">novo!</span>
                <span className="font-semibold text-gray-400">{category}</span>
                <span>
                  <IconStarFilled size={14} className="text-primary" />
                </span>
                <span className="font-bold">
                  {averageRating} ({totalEvaluations} avaliações)
                </span>
              </div>
              <button className="flex items-center gap-2 text-sm text-gray-400">
                <span>
                  <IconClock size={15} className="text-gray-500" />
                </span>
                <span className="transition duration-300 hover:text-primary">
                  10:00 às 23:00
                </span>
                <span>
                  <IconMapPin size={15} className="text-gray-500" />
                </span>
                <span className="transition duration-300 hover:text-primary">
                  2.5 Km
                </span>
              </button>
            </div>
          </div>
          <div id="card-address">
            <div id="content" className="text-gray-700">
              <p className="font-bold">Endereço da Loja, XX</p>
              <p className="font-bold">Bairro - Cidade - Estado</p>
              <button className="text-sm text-gray-400 transition duration-300 hover:text-orange-600">
                Ver rota até o endereço
              </button>
            </div>
          </div>
        </div>
        <StoreProfilePageTopDesktop />
        <StoreProductList />
      </div>
    </div>
  )
}
