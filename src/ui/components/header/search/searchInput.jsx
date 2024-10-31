import { zodResolver } from "@hookform/resolvers/zod"
import { IconFilter, IconLoader2, IconSearch } from "@tabler/icons-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "sonner"

import { searchSchema } from "@/domains/user/models/SearchTypes"

import { Form, FormControl, FormField, FormItem } from "../../ui/form/form"
import { Input } from "../../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { RestaurantFilter } from "../restaurantFilter/RestaurantFilter"

export function SearchInput() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchText = searchParams.get("produto")
  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: searchText ? searchText : "",
    },
  })

  const onError = (errors) => {
    if (errors.search) {
      toast.error(errors.search.message) // Mostra a mensagem de erro em um toast
    }
  }

  const onSubmit = (data) => {
    const newParams = new URLSearchParams(searchParams) // Preserva os parâmetros existentes
    newParams.set("produto", data.search) // Define ou atualiza o parâmetro `produto`

    navigate(`/produtos/pesquisar?${newParams.toString()}`)
  }

  const loading = false

  return (
    <div className="relative order-2 m-auto flex w-full items-center justify-center md:order-1 xl:w-[50%]">
      <Form {...form} className="flex w-full">
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex w-full items-center"
        >
          {loading ? (
            <IconLoader2
              className="absolute left-0 ml-2 animate-spin text-primary"
              size={20}
            />
          ) : (
            <button className="absolute left-0 ml-2">
              <IconSearch className="text-primary" size={20} />
            </button>
          )}
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex w-full">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Busque por produtos"
                    className="bg-background pl-8"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Popover className="relative" placement="center">
        <PopoverTrigger className="absolute right-0 mr-2 text-gray-500">
          <IconFilter size={20} />
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={20}
          className="relative left-2 w-full max-w-72 sm:max-w-sm md:max-w-lg"
        >
          <RestaurantFilter />
        </PopoverContent>
      </Popover>
    </div>
  )
}
