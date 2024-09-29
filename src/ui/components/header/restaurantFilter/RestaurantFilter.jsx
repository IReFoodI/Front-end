import { Cross1Icon } from "@radix-ui/react-icons"
import { PopoverClose } from "@radix-ui/react-popover"
import { useState } from "react"

import MapPin from "@/ui/assets/MapPin"
import StarIcon from "@/ui/assets/StarIcon"
import { Slider } from "@/ui/components/ui/slider"

import { FilterItemContainer } from "./FilterItemContainer"
import { SliderMetric } from "./SliderMetric"

export function RestaurantFilter() {
  const [sliderValue, setSlidervalue] = useState([0])

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
    <div>
      <div className="flex">
        <div>
          <FilterItemContainer title={`Ordenar por`} items={ordinateBy} />
          <FilterItemContainer
            title={`Tipo de entrega`}
            items={kindOfDelivery}
          />
          <FilterItemContainer title={`Categoria`} items={categories} />
        </div>

        <PopoverClose className="flex justify-center">
          <Cross1Icon className="text-lilac-800 size-6" />
        </PopoverClose>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Preço (R$)</h2>
        <Slider
          defaultValue={sliderValue}
          max={100}
          step={10}
          onValueChange={(currentSliderValue) =>
            setSlidervalue(currentSliderValue)
          }
        />
        <SliderMetric
          initialValue={0}
          currentValue={sliderValue}
          finalValue={100}
          step={20}
        />
      </div>
    </div>
  )
}
