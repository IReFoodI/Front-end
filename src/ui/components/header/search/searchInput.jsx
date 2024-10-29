import { IconFilter, IconLoader2, IconSearch } from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { useDebounce } from "@/app/hooks/useDebounce"

import { Input } from "../../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { RestaurantFilter } from "../restaurantFilter/RestaurantFilter"

export function SearchInput() {
  const [searchText, setSearchText] = useState("")

  const debounceSearchText = useDebounce(searchText)

  function handleUpdateSearchText(e) {
    setSearchText(e?.target?.value)
  }
  const loading = false

  useEffect(() => {
    console.log(debounceSearchText)
  }, [debounceSearchText])

  return (
    <div className="relative order-2 m-auto flex w-full items-center justify-center md:order-1 xl:w-[50%]">
      {loading ? (
        <IconLoader2
          className="absolute left-0 ml-2 animate-spin text-primary"
          size={20}
        />
      ) : (
        <IconSearch className="absolute left-0 ml-2 text-primary" size={20} />
      )}
      <Input
        type="text"
        placeholder="Busque por estabelecimentos"
        className="bg-background pl-8"
        value={searchText}
        onChange={handleUpdateSearchText}
      />

      <Popover className="relative" placement="center">
        <PopoverTrigger className="absolute right-0 mr-2 text-gray-500">
          <IconFilter size={20} />
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={20}
          className="relative left-2 w-full"
        >
          <RestaurantFilter />
        </PopoverContent>
      </Popover>
    </div>
  )
}
