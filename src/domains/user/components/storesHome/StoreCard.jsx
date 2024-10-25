import { IconClockHour4, IconStarFilled } from "@tabler/icons-react"

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
    hours = [],
    isFavorited,
    restaurant: {
      fantasy = "Nome não disponível",
      discount = "",
      averageRating = "0.0",
      category = "Categoria não disponível",
      urlBanner = "",
      urlLogo = "",
    } = {},
  } = storeData

  const formatBusinessHours = hours
    .map((hours) => `${hours.openingTime} às ${hours.closingTime}`)
    .join(", ")

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
            src={urlBanner}
            alt={`${name}`}
            className="h-auto max-h-full w-full rounded-[23px] object-cover"
          />
          <div className="-translatef-x-1/2 absolute left-1/4 top-1/2 aspect-square h-[50%] w-[50%] translate-y-1/3 transform">
            <img
              src={urlLogo}
              alt={`${fantasy} Logo`}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </CardContent>

      <CardContent className="flex flex-col gap-1 p-0 sm:p-0">
        <CardTitle className="truncate font-inter font-semibold text-[hsl(var(--foreground))] sm:text-2xl lg:text-xl">
          {fantasy}
        </CardTitle>
        {discount && (
          <div className="inline-block w-fit rounded-[10px] bg-[hsl(var(--primary))] px-2 py-1">
            <span className="font-inter font-semibold text-[hsl(var(--primary-foreground))] sm:text-2xl lg:text-sm">
              {discount}
            </span>
          </div>
        )}

        <div className="flex items-center">
          <IconStarFilled className="h-[16px] w-[16px] text-[hsl(var(--primary))] sm:h-[20px] sm:w-[20px] lg:h-[24px] lg:w-[24px]" />
          <span className="ml-4 font-inter font-semibold text-[hsl(var(--foreground))] sm:text-2xl lg:text-sm">
            {averageRating}
          </span>
          <span className="ml-4 font-inter text-sm font-semibold text-gray-500">
            {category}
          </span>
        </div>

        <div className="flex items-center">
          <IconClockHour4 className="mr-2 text-[hsl(var(--muted-foreground))]" />
          <span className="font-inter font-medium text-[hsl(var(--muted-foreground))] sm:text-2xl lg:text-sm">
            {formatBusinessHours || "Horário não disponível"}
          </span>
        </div>
      </CardContent>

      <CardContent className="p-0 pt-0 sm:p-0">
        <FavoriteButton isFavorited={isFavorited} onClick={onFavoriteToggle} />
      </CardContent>
    </Card>
  )
}
