import {
  // IconCurrencyDollar,
  IconHome,
  IconPaperBag,
  // IconMenu2,
  IconToolsKitchen2,
} from "@tabler/icons-react"
import { NavLink } from "react-router-dom"

import { DashboardConfigMenu } from "./DashboardConfigMenu"
import { DashboardLogout } from "./DashboardLogout"

export function SidebarDashboard() {
  const ITENS_SIDEBAR = [
    {
      linkTo: "/dashboard/inicio",
      icon: IconHome,
      text: "Início",
    },
    {
      linkTo: "/dashboard/pedidos",
      icon: IconPaperBag,
      text: "Pedidos",
    },
    {
      linkTo: "/dashboard/cardapio?page=0",
      icon: IconToolsKitchen2,
      text: "Cardápio",
    },
  ]

  return (
    <>
      <nav className="z-100 flex flex-row items-center justify-center gap-1.5 bg-slate-900 py-2 pt-0 text-sm text-white md:py-6 lg:max-w-24 lg:flex-grow lg:flex-col lg:justify-between lg:gap-3 lg:px-4">
        <ul className="flex flex-row gap-1.5 md:gap-3 lg:flex-col lg:justify-start">
          {ITENS_SIDEBAR.map((Item, key) => (
            <li key={key}>
              <NavLink
                to={`${Item?.linkTo}`}
                className="flex w-16 flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-primary/60 md:w-20 [&.active]:bg-primary"
              >
                <Item.icon className="h-6 w-6 md:h-10 md:w-10" />
                <p className="text-xs md:text-sm">{Item?.text}</p>
              </NavLink>
            </li>
          ))}
          {/* <NavLink
            to={"/dashboard/financas"}
            className={`flex w-16 select-none flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-primary md:w-20 [&.active]:bg-primary`}
            variant="ghost"
          >
            <IconCurrencyDollar className="size-6 md:size-10" />
            <p className="text-xs md:text-sm">Finanças</p>
          </NavLink> */}
        </ul>
        <div className="flex flex-row gap-1.5 md:gap-3 lg:flex-col">
          <DashboardConfigMenu />
          <DashboardLogout />
        </div>
      </nav>
    </>
  )
}
