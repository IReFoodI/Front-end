import {
  IconClock,
  IconHeart,
  IconInfoCircle,
  IconMapPin,
  IconStarFilled,
} from "@tabler/icons-react"

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
        {/* <div id="icons-desktop" className='hidden xl:flex items-center gap-2 text-gray-400 justify-end py-3'>
        <span><IconClock size={15} className='text-gray-400' /></span>
        <span>xx:xx às xx:xx</span>
        <span><IconMapPin size={15} className='text-gray-400' /></span>
        <span>xx.x Km</span>
      </div>
      <div id='card-desktop' className='max-w-[550px] rounded-xl bg-white hidden xl:flex ms-7 relative bottom-20'>
        <div className='bg-logo-loja bg-cover rounded w-24 h-24 relative right-7' />
        <div id="info" className='flex-1 py-3 pe-3'>
          <div className='flex justify-between'>
            <h1 className='text-gray-700 font-bold text-2xl'>Dragão Verde</h1>
            <div id="icons" className='flex gap-2 text-orange-500 justify-end'>
              <IconInfoCircle stroke={2} /><IconHeart stroke={2} />
            </div>
          </div>
          <span className='text-orange-500 font-bold'>novo!</span>
          <div className="flex items-center gap-2">
            <span><IconStarFilled size={15} className='text-orange-500' /></span>
            <span className='text-gray-500 font-bold'>5,0 (10 avaliações)</span>
            <span className='text-gray-400 font-bold'>Restaurante</span>
          </div>
        </div>
      </div> */}
      </div>
    </div>
  )
}
