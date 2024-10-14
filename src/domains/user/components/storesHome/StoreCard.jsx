import { IconStarFilled } from "@tabler/icons-react"

import { cn } from "@/app/utils/cn"
import { Card, CardContent, CardTitle } from "@/ui/components/ui/card"

import { FavoriteButton } from "../favorites/FavoriteButton"

export function StoreCard({
  className,
  storeData = {},
  onFavoriteToggle,
  ...props
}) {
  const {
    name = "Nome não disponível",
    discount = "",
    rating = "0.0",
    category = "Categoria não disponível",
    opening_hours = "Horário não disponível",
    isFavorited = false,
    imagePath = "",
    logoPath = "",
  } = storeData

  return (
    <Card
      className={cn(
        "relative grid h-auto min-h-[8.8125rem] w-auto grid-cols-[25%_55%_10%] gap-4 rounded-2xl bg-[hsl(var(--secondary))] p-3 shadow-lg sm:p-4 lg:pl-2",
        className
      )}
      {...props}
    >
      <CardContent className="relative flex h-full w-full items-center justify-center p-0 sm:p-0">
        <div className="relative h-auto w-full">
          <img
            src={imagePath}
            alt={`${name} Image`}
            className="h-auto max-h-full w-full rounded-[23px] object-cover"
          />
          <div className="-translatef-x-1/2 absolute left-1/2 top-1/2 aspect-square h-[50%] w-[50%] translate-y-1/3 transform">
            <img
              src={logoPath}
              alt={`${name} Logo`}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </CardContent>

      {/* Textos */}
      <CardContent className="flex flex-col gap-1 p-0 sm:p-0">
        <CardTitle className="truncate font-inter font-semibold text-[hsl(var(--foreground))] sm:text-2xl lg:text-xl">
          {name}
        </CardTitle>
        {discount && (
          <div className="mt-2 inline-block w-fit rounded-[10px] bg-[hsl(var(--primary))] px-2 py-1">
            <span className="font-inter font-semibold text-[hsl(var(--primary-foreground))] sm:text-2xl lg:text-sm">
              {discount}
            </span>
          </div>
        )}

        <div className="flex items-center">
          <IconStarFilled className="h-[16px] w-[16px] text-[hsl(var(--primary))] sm:h-[20px] sm:w-[20px] lg:h-[24px] lg:w-[24px]" />
          <span className="ml-4 font-inter font-semibold text-[hsl(var(--foreground))] sm:text-2xl lg:text-sm">
            {rating}
          </span>
          <span className="ml-4 font-inter font-semibold text-[hsl(var(--muted-foreground))] sm:text-2xl lg:text-sm">
            {category}
          </span>
        </div>

        <div className="flex items-center">
          <span className="font-inter font-medium text-[hsl(var(--muted-foreground))] sm:text-2xl lg:text-sm">
            {opening_hours}
          </span>
        </div>
      </CardContent>

      {/* Botão de favorito */}
      <CardContent className="p-0 pt-0 sm:p-0">
        <FavoriteButton isFavorited={isFavorited} onClick={onFavoriteToggle} />
      </CardContent>
    </Card>
  )
}
