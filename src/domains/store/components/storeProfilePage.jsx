import {
  IconClock,
  IconHeart,
  IconInfoCircle,
  IconMapPin,
  IconStarFilled,
} from "@tabler/icons-react"

import StoreProductList from "./StoreProductList"
import { StoreProfilePageTopDesktop } from "./storeProfilePageTopDesktop"

export const StoreProfilePage = () => {
  return (
    <div
      id="page"
      className="mx-auto w-full min-w-80 max-w-[1280px] antialiased"
    >
      <div className="h-20"></div>
      <div
        id="capa"
        className="relative h-[140px] w-full bg-[url('https://via.placeholder.com/800x400')] bg-cover px-5 xl:rounded"
      >
        <div className="relative top-24 h-20 w-20 rounded-full bg-[url('https://via.placeholder.com/150')] bg-cover xl:hidden" />
      </div>
      <div className="px-5 pb-5 xl:px-0">
        <div
          id="icons-mobile"
          className="flex justify-end gap-2 py-3 text-gray-400 xl:hidden"
        >
          <IconInfoCircle stroke={2} />
          <IconHeart stroke={2} />
        </div>
        <div id="cards-mobile" className="flex flex-col gap-5 xl:hidden">
          <div id="card-info">
            <div id="card-content" className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-gray-700">Dragão Verde</h1>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-orange-500">novo!</span>
                <span className="font-bold text-gray-400">Restaurante</span>
                <span>
                  <IconStarFilled size={15} className="text-gray-500" />
                </span>
                <span className="font-bold text-gray-500">
                  5,0 (10 avaliações)
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>
                  <IconClock size={15} className="text-gray-400" />
                </span>
                <span>xx:xx às xx:xx</span>
                <span>
                  <IconMapPin size={15} className="text-gray-400" />
                </span>
                <span>xx.x Km</span>
              </div>
            </div>
          </div>
          <div id="card-address">
            <div id="content">
              <p className="font-bold text-gray-700">Endereço da Loja, XX</p>
              <p className="font-bold text-gray-700">
                Bairro - Cidade - Estado
              </p>
              <p className="text-sm text-gray-400">Ver rota até o endereço</p>
            </div>
          </div>
        </div>
        {/* DESKTOP */}
        <StoreProfilePageTopDesktop />
        <StoreProductList />
      </div>
    </div>
  )
}
