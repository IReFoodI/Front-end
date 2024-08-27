import { IconMenu2 } from "@tabler/icons-react"
import { IconShoppingBag } from "@tabler/icons-react"
import { Link } from "react-router-dom"

import logo from "../../assets/Logo.svg"

function HeaderMobileWithoutSearch() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="w-9 rounded-sm bg-orange-100 p-1">
        <IconMenu2 className="m-auto text-[#FB3D01]" size={24} />
      </div>
      <div className="w-24">
        <img src={logo} alt="Logo" className="w-full" />
      </div>
      <Link className="relative w-9 rounded-sm bg-orange-100 p-1" to="/">
        {/* colocar rota para página de pedidos na sacola de compras */}
        <span className="absolute left-0 top-0 mx-px inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#FB3D01] px-1 py-1 text-xs leading-none text-white">
          1
        </span>
        <IconShoppingBag className="text-[#FB3D01]" size={28} />
      </Link>
    </div>
  )
}

export default HeaderMobileWithoutSearch
