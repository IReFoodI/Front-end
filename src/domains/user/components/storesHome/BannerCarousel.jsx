import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/components/ui/carousel"

import { BannerPromo } from "./BannerPromo"

export function BannerCarousel() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <BannerPromo title="Confira nossas ofertas especiais!" />
        </CarouselItem>
        <CarouselItem>
          <BannerPromo title="Confira nossas ofertas!" />
        </CarouselItem>
        <CarouselItem>
          <BannerPromo title="Confira nossas ofertas sensacionais!" />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
