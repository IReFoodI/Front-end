/* eslint-disable prettier/prettier */
import { IconClock, IconHeart, IconInfoCircle, IconMapPin, IconStarFilled } from '@tabler/icons-react';

export const StoreProfilePage = () => {
  return <div id="page" className="border border-gray-200 min-w-80 max-w-96 h-[720px] mx-auto">
    <div className='h-20'></div>
    <div id="capa" className="bg-capa-loja bg-cover w-full h-[140px]"></div>
    <section className=' px-5 pb-5'>
      <div id="icons" className='flex gap-2 text-gray-400 justify-end py-3'>
        <IconInfoCircle stroke={2} /><IconHeart stroke={2} />
      </div>
      <div id="cards" className='flex flex-col gap-5'>
        <div id="card-info">
          <div id="content" className='relavtive flex flex-col gap-1'>
            <div className='bg-logo-loja bg-cover rounded w-20 h-20 absolute top-[28%]' />
            <h1 className='text-gray-700 font-bold text-2xl'>Dragão Verde</h1>
            <div className='flex items-center gap-2 text-sm'>
              <span className='text-orange-500 font-bold'>novo!</span>
              <span className='text-gray-400 font-bold'>Restaurante</span>
              <span><IconStarFilled size={15} className='text-gray-500' /></span>
              <span className='text-gray-500 font-bold'>5,0 (10 avaliações)</span>
            </div>
            <div className='flex items-center gap-2 text-gray-400 text-sm'>
              <span><IconClock size={15} className='text-gray-400' /></span>
              <span>xx:xx às xx:xx</span>
              <span><IconMapPin size={15} className='text-gray-400' /></span>
              <span>xx.x Km</span>
            </div>
          </div>
        </div>
        <div id="card-address">
          <div id="content">
            <p className='text-gray-700 font-bold'>Endereço da Loja, XX</p>
            <p className='text-gray-700 font-bold'>Bairro - Cidade - Estado</p>
            <p className='text-gray-400 text-sm'>Ver rota até o endereço</p>
          </div>
        </div>
      </div>
    </section>
  </div>
}
