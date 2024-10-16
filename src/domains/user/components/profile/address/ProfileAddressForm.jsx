import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"

import { useCep } from "@/domains/user/hooks/useCep"
import {
  changeUserAddressTypes,
  states,
} from "@/domains/user/models/ChangeUserAddressTypes"
import { Button } from "@/ui/components/ui/button/button"
import { CepPatternFormat } from "@/ui/components/ui/cep-pattern-format"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/ui/components/ui/form/form"
import { Input } from "@/ui/components/ui/input"

const FormSchema = changeUserAddressTypes

export function ProfileAddressForm() {
  const location = useLocation()
  const initialData = useMemo(
    () =>
      location.state?.address || {
        zipCode: "",
        street: "",
        number: "",
        district: "",
        complement: "",
        city: "",
        state: "",
        isDefault: false,
      },
    [location.state?.address]
  )
  const formMethods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData,
  })

  const { getValues, setValue, reset, watch } = formMethods
  const [encodedAddress, setEncodedAddress] = useState("")

  useEffect(() => {
    reset(initialData)
  }, [initialData, reset])

  useCep(getValues("zipCode"), setValue, getValues)

  const watchedFields = watch([
    "zipCode",
    "street",
    "number",
    "district",
    "city",
    "state",
  ])

  useEffect(() => {
    const [zipCode, street, number, district, city, state] = watchedFields

    const fullAddress = `${street}, ${number} ${district ? `${district},` : ""} ${city} - ${state}, ${zipCode}`
    setEncodedAddress(encodeURIComponent(fullAddress))
  }, [watchedFields])

  function onSubmit(data) {
    console.log("Dados enviados:", data)
  }

  return (
    <>
      <h1 className="col-span-full w-full pb-6 text-center text-2xl font-semibold">
        {location.state ? "Alterar Endereço" : "Adicionar Endereço"}
      </h1>
      <div className="flex justify-center">
        <div className="relative bg-white p-4">
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className="relative space-y-4 text-center"
            >
              <div className="grid grid-cols-1 gap-4 rounded-lg md:grid-cols-[1fr_0.5fr_1.6fr]">
                <FormField
                  control={formMethods.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CepPatternFormat {...field} />
                      </FormControl>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />

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
                      <FormMessage className="text-left" />
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
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={formMethods.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Rua"
                          {...field}
                          className="h-12 w-full rounded-md border-2 border-input p-4"
                        />
                      </FormControl>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formMethods.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Complemento"
                          {...field}
                          className="h-12 w-full rounded-md border-2 border-input p-4"
                        />
                      </FormControl>
                      <FormMessage className="text-left" />
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
                          type="text"
                          placeholder="Número"
                          {...field}
                          className="h-12 w-full rounded-md border-2 border-input p-4 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage className="text-left" />
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
                      <FormMessage className="text-left" />
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
                  {location.state ? "Salvar Alterações" : "Adicionar Endereço"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  )
}
