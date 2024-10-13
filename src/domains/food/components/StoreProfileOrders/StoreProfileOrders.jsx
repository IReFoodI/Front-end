import { IconPaperBag } from "@tabler/icons-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/ui/components/ui/sheet"

export function StoreProfileOrders() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className={`flex w-16 flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-primary md:w-20 [&.active]:bg-primary`}
        >
          <IconPaperBag className="h-6 w-6 md:h-10 md:w-10" />
          <p className="text-xs md:text-sm">Pedidos</p>
        </button>
      </SheetTrigger>
      <SheetContent side={`left`} className="">
        <SheetTitle>Teste</SheetTitle>
        <SheetDescription>Teste de novo</SheetDescription>
      </SheetContent>
    </Sheet>
  )
}
