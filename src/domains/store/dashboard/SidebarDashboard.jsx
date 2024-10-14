import {
  IconCurrencyDollar,
  // IconMenu2,
  IconPaperBag,
  IconToolsKitchen2,
} from "@tabler/icons-react"
import { NavLink } from "react-router-dom"

import { DashboardConfigMenu } from "./DashboardConfigMenu"
import { DashboardLogout } from "./DashboardLogout"

export function SidebarDashboard() {
  return (
    <>
      <div className="z-50 flex flex-row items-center justify-center gap-1.5 bg-slate-900 py-2 pt-0 text-sm text-white md:py-6 lg:max-w-24 lg:flex-grow lg:flex-col lg:justify-between lg:gap-3 lg:px-4">
        <div className="flex flex-row gap-1.5 md:gap-3 lg:flex-col lg:justify-start">
          <NavLink
            to={"/dashboard/pedidos"}
            className={`flex w-16 select-none flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-primary md:w-20 [&.active]:bg-primary`}
            variant="ghost"
          >
            <IconPaperBag className="size-6 md:size-10" />
            <p className="text-xs md:text-sm">Pedidos</p>
          </NavLink>
          <NavLink
            to={"/dashboard/cardapio"}
            className={`flex w-16 select-none flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-primary md:w-20 [&.active]:bg-primary`}
            variant="ghost"
          >
            <IconToolsKitchen2 className="size-6 md:size-10" />
            <p className="text-xs md:text-sm">Cardápio</p>
          </NavLink>
          <NavLink
            to={"/dashboard/financas"}
            className={`flex w-16 select-none flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-primary md:w-20 [&.active]:bg-primary`}
            variant="ghost"
          >
            <IconCurrencyDollar className="size-6 md:size-10" />
            <p className="text-xs md:text-sm">Finanças</p>
          </NavLink>
        </div>
        <div className="flex flex-row gap-1.5 md:gap-3 lg:flex-col">
          <DashboardConfigMenu />
          <DashboardLogout />
        </div>
      </div>
    </>
  )
}
