/* eslint-disable prettier/prettier */
import { IconClock, IconHeart, IconInfoCircle, IconMapPin, IconStarFilled } from '@tabler/icons-react';

export const StoreProfilePageTopDesktop = () => {
  return <>
    <div id="icons-desktop" className='hidden xl:flex items-center gap-2 text-gray-400 justify-end py-3'>
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
    </div>
  </>




}
