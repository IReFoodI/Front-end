import { IconCaretDown } from "@tabler/icons-react"
import { IconSearch } from "@tabler/icons-react"
import { IconFilter } from "@tabler/icons-react"

import HeaderMobileWithoutSearch from "./HeaderMobileWhitoutSearch"

function HeaderMobileWithSearch() {
  return (
    <div>
      <HeaderMobileWithoutSearch />
      <div className="m-2 flex w-full items-center justify-center p-1">
        <p className="font-semibold">Endereço da pessoa, XX</p>
        <span className="ml-2">
          <IconCaretDown stroke={2} className="text-primary" />
        </span>
      </div>
      <div className="relative m-auto flex w-full items-center justify-center">
        <IconSearch className="absolute left-0 ml-2 text-primary" size={20} />
        <input
          type="text"
          placeholder="Busque por estabelecimentos"
          className="w-full rounded-lg border-2 border-solid border-[border] p-3 pl-8 text-[14px] text-[#616375]"
        />
        <IconFilter
          className="absolute right-0 mr-2 text-[#616375]"
          size={20}
        />
      </div>
    </div>
  )
}

export default HeaderMobileWithSearch
