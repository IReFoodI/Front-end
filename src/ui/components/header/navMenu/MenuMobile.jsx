import { IconMenu2 } from "@tabler/icons-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet"
import { ProfileSheet } from "../profileSheet/ProfileSheet"

function MenuMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="w-9 cursor-pointer rounded-sm bg-orange-100 p-1 md:hidden">
          <IconMenu2 className="m-auto text-primary" size={24} />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-[#F8F9FE]">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <ProfileSheet />
      </SheetContent>
    </Sheet>
  )
}

export default MenuMobile
