//hooks
import { useMediaQuery } from "@/app/hooks/useMediaQuery"

//components
import HeaderDesktop from "./HeaderDesktop"
import HeaderMobile from "./HeaderMobile"

function Header() {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return <div>{isDesktop ? <HeaderDesktop /> : <HeaderMobile />}</div>
}

export default Header
