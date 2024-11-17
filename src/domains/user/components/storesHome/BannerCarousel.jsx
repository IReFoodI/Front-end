// eslint-disable-next-line simple-import-sort/imports
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/components/ui/carousel"

import { BannerPromo } from "./BannerPromo"
import banner1Desktop from "@/ui/assets/banner-1.png"
import banner1Mobile from "@/ui/assets/banner-mobile-1.png"
import banner2Desktop from "@/ui/assets/banner-2.png"
import banner2Mobile from "@/ui/assets/banner-mobile-2.png"

const BANNER_URLS = [
  { desktop: banner1Desktop, mobile: banner1Mobile },
  { desktop: banner2Desktop, mobile: banner2Mobile },
]

export function BannerCarousel() {
  return (
    <Carousel>
      <CarouselContent>
        {BANNER_URLS.map((url) => (
          <CarouselItem key={url.desktop}>
            <BannerPromo url={url} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
