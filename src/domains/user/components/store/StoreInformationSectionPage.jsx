import {
  IconArrowLeft,
  IconHeart,
  IconInfoCircle,
  IconStarFilled,
} from "@tabler/icons-react"
import { Link } from "react-router-dom"


import logo from "./logo-loja.png"
import { StoreInformationInfo } from "./StoreInformationInfo"
import { StoreInformationReview } from "./StoreInformationReview"
import { StoreInformationTabs } from "./StoreInformationTabs"
import { StoreProfilePageTopDesktop } from "./StoreProfilePageTopDesktop"
import { ROUTES } from "@/app/router/routes"

export function StoreInformationSectionPage() {
  return (
    <div
      id="page"
      className="mx-auto w-full min-w-80 max-w-[1280px] px-5 py-8 text-gray-500 antialiased"
    >
      <header className="mb-6 xl:hidden">
        <div id="icons-mobile" className="flex justify-between">
          <Link
            to={ROUTES.LOJA}
          >
            <IconArrowLeft className="cursor-pointer transition duration-300 hover:text-primary" />
          </Link>
          <div className="flex justify-end gap-2 text-gray-400">
            <IconInfoCircle className="cursor-pointer transition duration-300 hover:text-primary" />
            <IconHeart className="cursor-pointer transition duration-300 hover:text-primary" />
          </div>
        </div>
        <div id="card-info">
          <div className="my-3 flex items-center gap-5">
            <button
              className="h-24 w-24 transform rounded-full bg-cover transition-transform duration-300 hover:scale-105"
              style={{ backgroundImage: `url(${logo})` }}
            />
            <div>
              <button className="text-3xl font-bold text-gray-700 transition duration-300 hover:text-primary">
                Dragão Verde
              </button>
              <p className="flex gap-3 font-semibold">
                <span className="text-primary">novo!</span>
                <span className="text-gray-400">Restaurante</span>
              </p>
            </div>
          </div>
          <span className="flex items-center gap-2">
            <IconStarFilled size={15} className="text-primary" />
            <IconStarFilled size={15} className="text-primary" />
            <IconStarFilled size={15} className="text-primary" />
            <IconStarFilled size={15} className="text-primary" />
            <IconStarFilled size={15} className="text-primary" />
            <span className="font-bold">5,0</span>
          </span>
          <span>10 avaliações</span>
        </div>
      </header>
      <StoreProfilePageTopDesktop />
      <div className="xl:hidden">
        <StoreInformationTabs />
      </div>
      <div className="hidden text-gray-700 xl:flex">
        <div className="w-1/2">
          <h2 className="mb-5 text-xl font-bold">Avaliações</h2>
          <StoreInformationReview />
        </div>
        <div className="w-1/2">
          <h2 className="mb-5 text-xl font-bold">Informações</h2>
          <StoreInformationInfo />
        </div>
      </div>
    </div>
  )
}
