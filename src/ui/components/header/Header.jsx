//hooks
import { useMediaQuery } from "@/app/hooks/useMediaQuery"

//components
import HeaderDesktop from "./HeaderDesktop"
import HeaderMobile from "./HeaderMobile"

function Header() {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <header className="w-screen bg-orange-50 p-3 drop-shadow-md">
      {isDesktop ? <HeaderDesktop /> : <HeaderMobile />}
    </header>
  )
}

export default Header
