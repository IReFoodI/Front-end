import { IconMenu2 } from "@tabler/icons-react"
import { useState } from "react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet"
import { ProfileSheet } from "../profileSheet/ProfileSheet"

export function MenuMobile() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  return (
    <Sheet
      open={isProfileOpen}
      onOpenChange={setIsProfileOpen}
      className="md:hidden"
    >
      <SheetTrigger asChild>
        <div className="w-9 cursor-pointer rounded-sm bg-[#ffeae4] p-1 md:hidden">
          <IconMenu2 className="m-auto text-primary" size={24} />
        </div>
      </SheetTrigger>
      <SheetHeader className="hidden">
        <SheetTitle />

        <SheetDescription />
      </SheetHeader>
      <SheetContent
        side={"left"}
        className="max-h-[100vh] overflow-auto bg-[#F8F9FE]"
      >
        <ProfileSheet closeModal={() => setIsProfileOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
