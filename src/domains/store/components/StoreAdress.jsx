import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { useCep } from "@/domains/store/hooks/useCep"
import {
  states,
  StoreAddressSchema,
} from "@/domains/store/models/StoreAddressType"
import { Button } from "@/ui/components/ui/button/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/ui/components/ui/form/form"
import { Input } from "@/ui/components/ui/input"

export function StoreAddressEdit({ initialData }) {
  const formMethods = useForm({
    resolver: zodResolver(StoreAddressSchema),
    defaultValues: {
      zipCode: "",
      address: "",
      number: "",
      district: "",
      additionalInfo: "",
      city: "",
      state: "",
    },
  })
  const { getValues, setValue, reset, watch } = formMethods
  const [encodedAddress, setEncodedAddress] = useState("")

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  useCep(getValues("zipCode"), setValue, getValues)

  const watchedFields = watch([
    "zipCode",
    "address",
    "number",
    "district",
    "city",
    "state",
  ])

  useEffect(() => {
    const [zipCode, address, number, district, city, state] = watchedFields

    const fullAddress = `${address}, ${number} ${
      district ? `${district},` : ""
    } ${city} - ${state}, ${zipCode}`

    setEncodedAddress(encodeURIComponent(fullAddress))
  }, [watchedFields])

  function onSubmit(data) {
    console.log("Dados enviados:", data)
  }

  return (
    <main className="flex flex-col justify-center">
      <h2 className="p-4 text-center text-3xl font-bold text-[#1E1F2B]">
        Endereço
      </h2>

      <div className="relative flex flex-col justify-center bg-white">
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="relative h-screen space-y-4 text-center"
          >
            <div className="grid grid-cols-1 gap-4 rounded-lg md:grid-cols-[1fr_0.5fr_1.6fr]">
              <div className="relative w-full">
                <Input
                  placeholder="Pesquisar CEP"
                  className="h-12 w-full rounded-md border-2 border-input pr-4"
                  {...formMethods.register("zipCode")}
                />
              </div>

              <FormField
                control={formMethods.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <select
                        {...field}
                        className="h-12 w-full rounded-md border-2 border-input p-3"
                      >
                        <option value="">UF</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formMethods.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Bairro"
                        {...field}
                        className="h-12 w-full rounded-md border-2 border-input p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={formMethods.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Rua"
                        {...field}
                        className="h-12 w-full rounded-md border-2 border-input p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formMethods.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Complemento"
                        {...field}
                        className="h-12 w-full rounded-md border-2 border-input p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formMethods.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Número"
                        {...field}
                        className="h-12 w-full rounded-md border-2 border-input p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formMethods.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Cidade"
                        {...field}
                        className="h-12 w-full rounded-md border-2 border-input p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div
              id="map"
              className="top-12 z-20 mx-auto flex aspect-video w-full items-center justify-center md:h-1/3"
            >
              <iframe
                key={encodedAddress}
                title="Google Maps"
                width="100%"
                height="100%"
                className="rounded-xl border-0"
                src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
            <div className="md:text-right">
              <Button type="submit">
                {initialData ? "Salvar Alterações" : "Adicionar Endereço"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  )
}
