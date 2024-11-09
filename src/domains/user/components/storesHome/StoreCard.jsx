import { IconCamera, IconClockHour4, IconStarFilled } from "@tabler/icons-react"
import { useState } from "react"
import { Link } from "react-router-dom"

import { cn } from "@/app/utils/cn"
import { Card, CardContent, CardTitle } from "@/ui/components/ui/card"

import { FavoriteButton } from "../favorites/FavoriteButton"

export function StoreCard({
  className,
  storeData = {},
  onFavoriteToggle,
  ...props
}) {
  const [imgError, setImgError] = useState(false)

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
    <Link
      className="block max-w-full"
      to={`loja/${storeData.restaurant.restaurantId}`}
    >
      <Card
        className={cn(
          "relative grid h-auto min-h-28 max-w-full grid-cols-12 gap-4 rounded-2xl border-0 bg-[hsl(var(--secondary))] p-2 shadow-none hover:bg-[hsl(var(--primary))]/5 sm:p-5",
          className
        )}
        {...props}
      >
        <CardContent className="relative col-span-4 flex h-full w-full items-center justify-center p-0 sm:p-0">
          <div className="relative h-auto w-full">
            {!imgError && (
              <img
                src={urlBanner}
                className="h-24 max-h-full w-24 max-w-full rounded-2xl object-cover"
                onError={() => setImgError(true)}
              />
            )}
            {imgError && (
              <div className="flex h-24 max-h-full w-24 max-w-full items-center justify-center rounded-2xl bg-gray-200 object-cover">
                <IconCamera className="text-muted" size={48} />
              </div>
            )}
            <div className="-mt-6 flex h-12 max-h-full w-24 max-w-full items-start justify-center sm:-mt-10 sm:h-20">
              <img
                src={urlLogo}
                className="h-12 max-h-full w-12 max-w-full rounded-full border-2 border-gray-100 object-cover sm:h-20 sm:w-20 sm:border-[2.5px]"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          </div>
        </CardContent>

        <CardContent className="col-span-6 flex flex-col p-0 sm:p-0">
          <CardTitle className="mb-2 truncate font-inter text-sm font-semibold text-[hsl(var(--foreground))] md:text-2xl lg:text-xl">
            {fantasy}
          </CardTitle>
          {discount && (
            <div className="mb-2 inline-block w-fit rounded-lg bg-[hsl(var(--primary))] px-2 py-1">
              <span className="font-inter font-semibold text-[hsl(var(--primary-foreground))] sm:text-2xl lg:text-sm">
                {discount}
              </span>
            </div>
          )}

          <div className="mb-2 flex items-center">
            <IconStarFilled className="h-[14px] w-[14px] text-[hsl(var(--primary))]" />
            <span className="ml-2 font-inter text-xs font-semibold text-[hsl(var(--foreground))] md:text-2xl lg:text-sm">
              {averageRating}
            </span>
            <span className="ml-2 font-inter text-xs font-semibold text-gray-500 sm:text-sm">
              {category}
            </span>
          </div>

          <div className="flex items-center">
            <IconClockHour4 className="mr-2 text-[hsl(var(--muted-foreground))]" />
            <span className="font-inter text-xs font-medium text-[hsl(var(--muted-foreground))] lg:text-sm">
              {formatBusinessHours || "--/--"}
            </span>
          </div>
        </CardContent>

        <CardContent className="col-span-2 flex items-start justify-end !p-0 sm:!p-0">
          <FavoriteButton
            className="-mr-4 -mt-1"
            isFavorited={isFavorited}
            onClick={(e) => {
              e.preventDefault()
              onFavoriteToggle()
            }}
          />
        </CardContent>
      </Card>
    </Link>
  )
}
