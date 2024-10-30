import { Cross1Icon } from "@radix-ui/react-icons"
import { PopoverClose } from "@radix-ui/react-popover"
import { IconMapPin } from "@tabler/icons-react"
import { useState } from "react"

import { Slider } from "@/ui/components/ui/slider"

import { FilterItemContainer } from "./FilterItemContainer"
import { SliderMetric } from "./SliderMetric"

export function RestaurantFilter() {
  const [sliderValue, setSlidervalue] = useState([0])

  // const ordinateBy = [
  //   {
  //     buttonTitle: "Mais próximos",
  //     imageSource: <IconMapPin className="size-4" />,
  //   },
  //   {
  //     buttonTitle: "Mais próximos",
  //     imageSource: <IconStar className="size-4" />,
  //   },
  // ]

  // const kindOfDelivery = [
  //   { buttonTitle: "Retirada", imageSource: <IconMapPin className="size-4" /> },
  //   { buttonTitle: "Entrega", imageSource: <IconMapPin className="size-4" /> },
  // ]

  const categories = [
    { buttonTitle: "Salgado", imageSource: <IconMapPin className="size-4" /> },
    { buttonTitle: "Doce", imageSource: <IconMapPin className="size-4" /> },
    // { buttonTitle: "Misto", imageSource: <IconMapPin className="size-4" /> },
  ]

  return (
    <div className="relative">
      <div className="flex flex-col">
        <h2 className="text-lg font-medium">Filtrar por</h2>
        <div>
          {/* <FilterItemContainer title={`Ordenar por`} items={ordinateBy} /> */}
          {/* <FilterItemContainer
            title={`Tipo de entrega`}
            items={kindOfDelivery}
          /> */}
          <FilterItemContainer title={`Categoria`} items={categories} />
        </div>

        <PopoverClose className="absolute right-0 top-0 flex justify-center">
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
