import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { fetchAddressData } from "@/domains/store/hooks/useAddress"
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

export function StoreAddressEdit() {
  const [error, setError] = useState(null)

  const initialData = useMemo(
    () => ({
      zipCode: "",
      street: "",
      number: "",
      district: "",
      complement: "",
      city: "",
      state: "",
      isDefault: false,
    }),
    []
  )

  const formMethods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData,
  })

  const { getValues, setValue, reset, watch } = formMethods
  const [encodedAddress, setEncodedAddress] = useState("")

  useEffect(() => {
    async function fetchData() {
      await fetchAddressData(reset, setError)
    }
    fetchData()
  }, [reset])

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
    <div className="flex flex-1 p-4">
      <main className="mx-auto flex w-fit max-w-[1216px] flex-col items-center justify-start gap-6 text-gray-600 antialiased lg:h-auto">
        <div className="mb-5 mt-4 flex w-full flex-col">
          <h1 className="mb-4 text-3xl font-semibold sm:mb-0">Endereço</h1>
          <p>Ajuste as informações do endereços</p>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center">
          <div className="relative bg-white">
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
                            className="h-12 w-full rounded-md border-2 border-input p-4"
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
                  />
                </div>
                <div className="md:text-right">
                  <Button type="submit">
                    {location.state
                      ? "Salvar Alterações"
                      : "Adicionar Endereço"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </main>
    </div>
  )
}
