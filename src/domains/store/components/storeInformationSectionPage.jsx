import {
  IconArrowLeft,
  IconHeart,
  IconInfoCircle,
  IconStarFilled,
} from "@tabler/icons-react"

import { StoreInformationInfo } from "./storeInformationInfo"
import { StoreInformationReview } from "./storeInformationReview"
import { StoreInformationTabs } from "./storeInformationTabs"
import { StoreProfilePageTopDesktop } from "./storeProfilePageTopDesktop"

export const StoreInformationSectionPage = () => {
  return (
    <div
      id="page"
      className="mx-auto w-full min-w-80 max-w-[1280px] px-5 py-8 text-gray-500 antialiased"
    >
      <header className="mb-6 xl:hidden">
        <div id="icons-mobile" className="flex justify-between">
          <IconArrowLeft stroke={2} className="text-gray-500" />
          <div className="flex justify-end gap-2 text-orange-500">
            <IconInfoCircle stroke={2} />
            <IconHeart stroke={2} />
          </div>
        </div>
        <div id="card-info">
          <div className="my-3 flex items-center gap-5">
            <div className="h-24 w-24 rounded-full bg-[url('https://via.placeholder.com/150')] bg-cover" />
            <div>
              <h1 className="text-3xl font-bold text-gray-700">Dragão Verde</h1>
              <p className="flex gap-3">
                <span className="font-bold text-orange-500">novo!</span>
                <span className="font-bold text-gray-400">Restaurante</span>
              </p>
            </div>
          </div>
          <span className="flex items-center gap-2">
            <IconStarFilled size={15} className="text-orange-500" />
            <IconStarFilled size={15} className="text-orange-500" />
            <IconStarFilled size={15} className="text-orange-500" />
            <IconStarFilled size={15} className="text-orange-500" />
            <IconStarFilled size={15} className="text-orange-500" />
            <span className="font-bold text-gray-500">5,0</span>
          </span>
          <span className="text-gray-500">10 avaliações</span>
        </div>
      </header>
      <div
        id="capa"
        className="relative hidden h-[140px] w-full bg-[url('https://via.placeholder.com/800x400')] bg-cover px-5 xl:flex xl:rounded"
      ></div>
      <StoreProfilePageTopDesktop />
      <div className="xl:hidden">
        <StoreInformationTabs />
      </div>
      <div className="hidden xl:flex">
        <div className="w-1/2">
          <h2 className="mb-5 text-xl font-bold text-gray-700">Avaliações</h2>
          <StoreInformationReview />
        </div>
        <div className="w-1/2">
          <h2 className="mb-5 text-xl font-bold text-gray-700">Informações</h2>
          <StoreInformationInfo />
        </div>
      </div>
    </div>
  )
}
