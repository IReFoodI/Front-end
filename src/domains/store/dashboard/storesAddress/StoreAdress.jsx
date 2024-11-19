import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"

import { useFetch } from "@/app/hooks/useFetch"
import { getEncodedAddress } from "@/app/utils/encodeAddress"
import { useCep } from "@/domains/user/hooks/useCep"
import {
  changeUserAddressTypes,
  states,
} from "@/domains/user/models/ChangeUserAddressTypes"
import { addressService } from "@/domains/user/services/addressService"
import useUserStore from "@/domains/user/stores/useUserStore"
import { Button } from "@/ui/components/ui/button/button"
import { CepPatternFormat } from "@/ui/components/ui/cep-pattern-format"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/components/ui/form/form"
import { Input } from "@/ui/components/ui/input"
import { Loading } from "@/ui/components/ui/loading"

const FormSchema = changeUserAddressTypes

export function StoreAddressEdit() {
  const { user } = useUserStore()
  const [addressId, setAddressId] = useState("")
  const { loading: loadingSaveAddress, onRequest } = useFetch()
  const [encodedAddress, setEncodedAddress] = useState("")

  const initialData = {
    cep: "",
    street: "",
    number: "",
    district: "",
    complement: "",
    city: "",
    state: "",
    isDefault: false,
    type: "RESTAURANT",
  }

  const formMethods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData,
  })

  const { getValues, setValue, reset, watch } = formMethods

  useEffect(() => {
    function fetchAddress() {
      onRequest({
        request: () =>
          addressService.getAddressRestaurantByRestaurantId(user?.restaurantId),
        onSuccess: (data) => {
          if (data && data.length > 0) {
            reset({ ...data[0] })
            setAddressId(data[0].addressId)
          } else {
            toast.info("Sem endereço cadastrado")
          }
        },
        onError: "Erro ao buscar endereço cadastrado",
      })
    }
    fetchAddress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, onRequest])

  useCep(getValues("cep"), setValue, getValues)

  const watchedFields = watch([
    "cep",
    "street",
    "number",
    "district",
    "city",
    "state",
  ])

  useEffect(() => {
    const [cep, street, number, district, city, state] = watchedFields
    setEncodedAddress(
      getEncodedAddress({ cep, street, number, district, city, state })
    )
  }, [watchedFields])
  const onSubmit = async (data) => {
    await onRequest({
      request: () =>
        !addressId
          ? addressService.createAddress({ ...data, addressType: "RESTAURANT" })
          : addressService.updateAddress({
              ...data,
              addressType: "RESTAURANT",
              addressId,
              restaurantId: user?.restaurantId,
            }),
      onSuccess: () => {
        toast.success(
          !addressId
            ? "Endereço criado com sucesso!"
            : "Endereço alterado com sucesso!"
        )
      },
      onError: (error) => {
        console.error("Erro ao salvar endereço:", error)
        toast.error("Não foi possível salvar o endereço.")
      },
    })
  }

  if (loadingSaveAddress) {
    return <Loading />
  }

  return (
    <div className="flex flex-1 p-4">
      <main className="mx-auto flex w-fit max-w-[1216px] flex-col items-center justify-start gap-6 text-gray-600 antialiased lg:h-auto">
        <div className="mb-5 mt-4 flex w-full flex-col">
          <h1 className="mb-4 text-3xl font-semibold sm:mb-0">Endereço</h1>
          <p>Ajuste as informações do endereço</p>
        </div>
        <div className="flex justify-center">
          <div className="relative bg-white">
            <FormProvider {...formMethods}>
              <form
                onSubmit={formMethods.handleSubmit(onSubmit)}
                className="relative space-y-4 text-start"
              >
                <div className="grid grid-cols-1 gap-4 rounded-lg md:grid-cols-[1fr_0.5fr_1.6fr]">
                  <FormField
                    control={formMethods.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cep</FormLabel>
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
                        <FormLabel>UF</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="" disabled className="">
                              UF
                            </option>
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
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Bairro"
                            {...field}
                            className="p-4"
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
                        <FormLabel>Rua</FormLabel>
                        <FormControl>
                          <Input placeholder="Rua" {...field} className="p-4" />
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
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Complemento"
                            {...field}
                            className="p-4"
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
                        <FormLabel>Nº</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Número"
                            {...field}
                            className="p-4"
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
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Cidade"
                            {...field}
                            className="p-4"
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                </div>
                <div
                  id="map"
                  className="z-20 mx-auto flex aspect-video w-full items-center justify-center md:h-1/3"
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
                  <Button type="submit">Salvar Alterações</Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </main>
    </div>
  )
}
