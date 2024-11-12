import { IconMenu2 } from "@tabler/icons-react"
import { useState } from "react"

import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet"
import { ProfileSheet } from "../profileSheet/ProfileSheet"

export function MenuMobile() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  return (
    <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
      <SheetTrigger asChild>
        <div className="w-9 cursor-pointer rounded-sm bg-[#ffeae4] p-1 md:hidden">
          <IconMenu2 className="m-auto text-primary" size={24} />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-[#F8F9FE]">
        <ProfileSheet closeModal={() => setIsProfileOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
