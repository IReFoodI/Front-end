import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { states } from "@/domains/store/models/StoreAddressType"
import { useCep } from "@/domains/user/hooks/useCep"
import { changeUserAddressTypes } from "@/domains/user/models/ChangeUserAddressTypes"
import { addressService } from "@/domains/user/services/addressService"
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

export function ProfileAddressForm() {
  const params = useParams()
  const navigate = useNavigate()
  const { loading: loadingSaveAddress, onRequest: onRequestSaveAddress } =
    useFetch()

  const formMethods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  })

  const { getValues, setValue, reset, watch } = formMethods
  const [encodedAddress, setEncodedAddress] = useState("")

  const fetchAddress = useCallback(
    async (data) => {
      await onRequestSaveAddress({
        request: () => addressService.getAddressById(data),
        onSuccess: (data) => {
          reset({ ...data })
        },
        onError: () => navigate("/endereco"),
      })
    },
    [onRequestSaveAddress, reset]
  )

  useEffect(() => {
    if (params?.addressId) {
      fetchAddress(params?.addressId)
    }
  }, [params])

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

    const fullAddress = `${street}, ${number} ${district ? `${district},` : ""} ${city} - ${state}, ${cep}`
    setEncodedAddress(encodeURIComponent(fullAddress))
  }, [watchedFields])

  const onSubmit = async (data) => {
    return await onRequestSaveAddress({
      request: () =>
        !params?.addressId
          ? addressService.createAddress({ ...data, addressType: "USER" })
          : addressService.updateAddress({
              ...data,
              addressType: "USER",
              addressId: params?.addressId,
            }), // todo: ficará assim até ajustarem a lógica para a empresa
      onSuccess: () => navigate("/endereco"),
      successMessage: `${!params?.addressId ? "Endereço criado com sucesso!" : "Endereço alterado com sucesso!"}`,
    })
  }

  if (loadingSaveAddress) {
    return <Loading />
  }

  return (
    <>
      <h1 className="col-span-full w-full pb-6 text-center text-2xl font-semibold">
        {params?.addressId ? "Alterar Endereço" : "Adicionar Endereço"}
      </h1>
      <div className="relative bg-white p-4">
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="relative space-y-2 text-left sm:space-y-4"
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
                    <FormLabel>Bairro</FormLabel>
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
                    <FormLabel>Rua</FormLabel>
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
                    <FormLabel>Complemento</FormLabel>
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
              <div className="grid grid-cols-1 gap-4 rounded-lg md:grid-cols-2">
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
                          className="h-12 w-full rounded-md border-2 border-input p-4 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Etiqueta</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Tipo"
                          {...field}
                          className="h-12 w-full rounded-md border-2 border-input p-4 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
              </div>
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
            <div className="mt-9 flex flex-col justify-end gap-2 sm:flex-row">
              {params?.addressId && (
                <Link className="order-2 sm:order-1" to={"/endereco"}>
                  <Button
                    disabled={loadingSaveAddress}
                    variant="secondary"
                    className="w-full rounded-full border-2 py-5 text-base font-semibold transition-colors duration-300 ease-in-out sm:w-auto"
                  >
                    Cancelar Alterações
                  </Button>
                </Link>
              )}

              <Button
                disabled={loadingSaveAddress}
                type="submit"
                className="order-1 w-full rounded-full border-2 py-5 text-base font-semibold transition-colors duration-300 ease-in-out sm:w-auto"
              >
                {params?.addressId ? "Salvar Alterações" : "Adicionar Endereço"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}
