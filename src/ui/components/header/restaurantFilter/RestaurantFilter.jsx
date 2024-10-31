import { Cross1Icon } from "@radix-ui/react-icons"
import { PopoverClose } from "@radix-ui/react-popover"
import {
  IconBaguette,
  IconBuildingStore,
  IconBurger,
  IconCandy,
  IconChefHat,
  IconSalt,
} from "@tabler/icons-react"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

import { Slider } from "@/ui/components/ui/slider"

import { FilterItemContainer } from "./FilterItemContainer"
import { SliderMetric } from "./SliderMetric"

export function RestaurantFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sliderValue, setSlidervalue] = useState(() => {
    const param = searchParams?.get("preco")
    if (param) return [Number(param)]
    return [0]
  })

  const storeType = [
    {
      buttonTitle: "Restaurante",
      imageSource: <IconChefHat className="size-4" />,
    },
    {
      buttonTitle: "Padaria",
      imageSource: <IconBaguette className="size-4" />,
    },
    {
      buttonTitle: "Supermercado",
      imageSource: <IconBuildingStore className="size-4" />,
    },
    {
      buttonTitle: "Lancheria",
      imageSource: <IconBurger className="size-4" />,
    },
  ]

  function handleChange(currentSliderValue) {
    setSearchParams((prev) => {
      const currentParams = new URLSearchParams(prev) // Mantém os parâmetros atuais
      const existingValues = currentParams.get("preco")
      console.log(existingValues)
      if (existingValues) {
        if (currentSliderValue === 0) {
          currentParams.delete("preco")
        } else {
          currentParams.set("preco", String(currentSliderValue))
        }
      } else {
        if (currentSliderValue > 0) {
          currentParams.set("preco", String(currentSliderValue))
        }
      }
      console.log(currentParams)

      return currentParams // Retorna os parâmetros atualizados
    })
  }

  const categories = [
    { buttonTitle: "Salgado", imageSource: <IconSalt className="size-4" /> },
    { buttonTitle: "Doce", imageSource: <IconCandy className="size-4" /> },
  ]

  return (
    <div className="relative">
      <div className="flex flex-col">
        <h2 className="text-lg font-medium">Filtrar por</h2>
        <div>
          <FilterItemContainer
            title={`Tipo de estabelecimento`}
            items={storeType}
            param="tipo"
          />
          <FilterItemContainer
            title={`Categoria`}
            items={categories}
            param="categoria"
          />
        </div>

        <PopoverClose className="absolute right-0 top-0 flex justify-center">
          <Cross1Icon className="text-lilac-800 size-6" />
        </PopoverClose>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Preço (R$)</h2>
        <Slider
          className="px-2"
          defaultValue={sliderValue}
          max={100}
          step={10}
          onValueChange={(currentSliderValue) => {
            setSlidervalue(currentSliderValue)
            handleChange(currentSliderValue)
          }}
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
