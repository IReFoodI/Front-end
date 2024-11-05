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
    <Card
      className={cn(
        "relative grid h-auto min-h-28 w-auto grid-cols-[25%_55%_10%] gap-4 rounded-2xl bg-[hsl(var(--secondary))] p-3 shadow-lg sm:p-4 lg:pl-2",
        className
      )}
      {...props}
    >
      <CardContent className="relative flex h-full w-full items-center justify-center p-0 sm:p-0">
        <Link to="/">
          <div className="relative h-auto w-full">
            {!imgError && (
              <img
                src={urlBanner}
                className="h-auto max-h-full w-full rounded-[23px] object-cover"
                onError={() => setImgError(true)}
              />
            )}
            {imgError && (
              <div className="flex h-full w-full items-center justify-center rounded-[23px] bg-gray-200">
                <IconCamera className="text-muted" size={48} />
              </div>
            )}
            <div className="-translatef-x-1/2 absolute left-1/4 top-1/2 aspect-square h-[50%] w-[50%] translate-y-1/3 transform">
              <img
                src={urlLogo}
                className="h-full w-full rounded-full object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          </div>
        </Link>
      </CardContent>

      <CardContent className="flex flex-col justify-center p-0 sm:p-0">
        <Link to="/">
          <CardTitle className="mb-2 truncate font-inter font-semibold text-[hsl(var(--foreground))] sm:text-2xl lg:text-xl">
            {fantasy}
          </CardTitle>
          {discount && (
            <div className="inline-block w-fit rounded-[10px] bg-[hsl(var(--primary))] px-2 py-1">
              <span className="font-inter font-semibold text-[hsl(var(--primary-foreground))] sm:text-2xl lg:text-sm">
                {discount}
              </span>
            </div>
          )}

          <div className="mb-2 flex items-center">
            <IconStarFilled className="h-[14px] w-[14px] text-[hsl(var(--primary))]" />
            <span className="ml-2 font-inter font-semibold text-[hsl(var(--foreground))] sm:text-2xl lg:text-sm">
              {averageRating}
            </span>
            <span className="ml-2 font-inter text-sm font-semibold text-gray-500">
              {category}
            </span>
          </div>

          <div className="flex items-center">
            <IconClockHour4 className="mr-2 text-[hsl(var(--muted-foreground))]" />
            <span className="font-inter font-medium text-[hsl(var(--muted-foreground))] sm:text-2xl lg:text-sm">
              {formatBusinessHours || "--/--"}
            </span>
          </div>
        </Link>
      </CardContent>

      <CardContent className="p-0 pt-0 sm:p-0">
        <FavoriteButton isFavorited={isFavorited} onClick={onFavoriteToggle} />
      </CardContent>
    </Card>
  )
}
