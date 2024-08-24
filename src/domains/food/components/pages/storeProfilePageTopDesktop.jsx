import {
  IconClock,
  IconHeart,
  IconInfoCircle,
  IconMapPin,
  IconStarFilled,
} from "@tabler/icons-react"

export const StoreProfilePageTopDesktop = () => {
  return (
    <>
      <div
        id="icons-desktop"
        className="hidden items-center justify-end gap-2 py-3 text-gray-400 xl:flex"
      >
        <span>
          <IconClock size={15} className="text-gray-400" />
        </span>
        <span>xx:xx às xx:xx</span>
        <span>
          <IconMapPin size={15} className="text-gray-400" />
        </span>
        <span>xx.x Km</span>
      </div>
      <div
        id="card-desktop"
        className="relative bottom-20 ms-7 hidden max-w-[550px] rounded-xl bg-white xl:flex"
      >
        <div className="relative right-7 h-24 w-24 rounded bg-logo-loja bg-cover" />
        <div id="info" className="flex-1 py-3 pe-3">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-gray-700">Dragão Verde</h1>
            <div id="icons" className="flex justify-end gap-2 text-orange-500">
              <IconInfoCircle stroke={2} />
              <IconHeart stroke={2} />
            </div>
          </div>
          <span className="font-bold text-orange-500">novo!</span>
          <div className="flex items-center gap-2">
            <span>
              <IconStarFilled size={15} className="text-orange-500" />
            </span>
            <span className="font-bold text-gray-500">5,0 (10 avaliações)</span>
            <span className="font-bold text-gray-400">Restaurante</span>
          </div>
        </div>
      </div>
    </>
  )
}
