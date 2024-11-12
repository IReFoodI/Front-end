import { IconMenu2 } from "@tabler/icons-react"

import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet"
import { ProfileSheet } from "../profileSheet/ProfileSheet"

export function MenuMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="w-9 cursor-pointer rounded-sm bg-[#ffeae4] p-1 md:hidden">
          <IconMenu2 className="m-auto text-primary" size={24} />
        </div>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="max-h-[100vh] overflow-auto bg-[#F8F9FE]"
      >
        <ProfileSheet />
      </SheetContent>
    </Sheet>
  )
}
