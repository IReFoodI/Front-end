import { Cross1Icon } from "@radix-ui/react-icons"
import { PopoverContent } from "@radix-ui/react-popover"

import MapPin from "@/ui/assets/MapPin"
import StarIcon from "@/ui/assets/StarIcon"
import { Slider } from "@/ui/components/ui/slider"

import FilterItemContainer from "./FilterItemContainer"

const RestaurantFilter = () => {
  const ordinateBy = [
    { buttonTitle: "Mais próximos", imageSource: MapPin },
    {
      buttonTitle: "Mais próximos",
      imageSource: StarIcon,
    },
  ]

  const kindOfDelivery = [
    { buttonTitle: "Retirada", imageSource: MapPin },
    { buttonTitle: "Entrega", imageSource: MapPin },
  ]

  const categories = [
    { buttonTitle: "Salgado", imageSource: MapPin },
    { buttonTitle: "Doce", imageSource: MapPin },
    { buttonTitle: "Misto", imageSource: MapPin },
  ]

  return (
    <PopoverContent
      className="rounded-xl bg-white p-3 shadow-lg"
      sideOffset={20}
      align="end"
    >
      <div className="flex p-2">
        <div>
          <FilterItemContainer title={`Ordenar por`} items={ordinateBy} />
          <FilterItemContainer
            title={`Tipo de entrega`}
            items={kindOfDelivery}
          />
          <FilterItemContainer title={`Categoria`} items={categories} />
        </div>

        {/* <PopoverClose className="flex">
          <Cross1Icon className="text-lilac-800 size-5" />
        </PopoverClose> */}
      </div>

      <div className="flex flex-col gap-3 p-2">
        <h2 className="text-sm font-semibold">Preço (R$)</h2>
        <Slider />
      </div>
    </PopoverContent>
  )
}

export default RestaurantFilter