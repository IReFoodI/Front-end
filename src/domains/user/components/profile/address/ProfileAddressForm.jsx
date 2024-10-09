import { zodResolver } from "@hookform/resolvers/zod"
import { IconSearch } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { useFetchCep } from "@/domains/user/hooks/useCep"
import ilustra from "@/ui/assets/ilustra.png"
import { Button } from "@/ui/components/ui/button/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/ui/components/ui/form/form"
import { Input } from "@/ui/components/ui/input"

const estadosBrasileiros = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]

const FormSchema = z.object({
  cep: z.string().min(8, { message: "Insira um CEP válido com 8 caracteres." }),
  address: z
    .string()
    .min(5, { message: "O endereço deve ter pelo menos 5 caracteres." }),
  number: z.string().min(1, { message: "Insira o número." }),
  apartment: z.string().optional(),
  additionalInfo: z.string().optional(),
  city: z
    .string()
    .min(3, { message: "Cidade deve ter pelo menos 3 caracteres." }),
  state: z.enum(estadosBrasileiros, { message: "Selecione um estado válido." }),
})

export function ProfileAddressForm({ initialData }) {
  const formMethods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cep: "",
      address: "",
      number: "",
      apartment: "",
      additionalInfo: "",
      city: "",
      state: "",
    },
  })

  const { register, watch, setValue, reset } = formMethods
  const [encodedAddress, setEncodedAddress] = useState("")

  const cep = watch("cep")
  const address = watch("address")
  const number = watch("number")
  const apartment = watch("apartment")
  const additionalInfo = watch("additionalInfo")
  const city = watch("city")
  const state = watch("state")

  useFetchCep(cep, setValue)

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  useEffect(() => {
    const fullAddress = `${address}, ${number} ${
      apartment ? `Apto: ${apartment},` : ""
    } ${additionalInfo ? `${additionalInfo},` : ""} ${city} - ${state}, ${cep}`

    setEncodedAddress(encodeURIComponent(fullAddress))
  }, [cep, address, number, apartment, additionalInfo, city, state])

  function onSubmit(data) {
    console.log("Dados enviados:", data)
  }

  return (
    <>
      <h2 className="p-4 text-center text-3xl font-bold text-[#1E1F2B]">
        {initialData ? "Alterar Endereço" : "Adicionar Endereço"}
      </h2>

      <div className="flex justify-center">
        <div className="relative bg-white p-10">
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className="relative h-screen space-y-4 text-center"
            >
              <div className="grid grid-cols-1 gap-4 rounded-lg md:grid-cols-[1fr_0.5fr_1.5fr]">
                <div className="relative w-full">
                  <Input
                    placeholder="Pesquisar CEP"
                    className="h-12 w-full rounded-md border-2 border-muted-foreground pr-4"
                    {...register("cep")}
                  />
                  <IconSearch className="absolute right-3 top-1/2 -translate-y-1/2 transform text-[#B6BAD3]" />
                </div>

                <FormField
                  control={formMethods.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <select
                          {...field}
                          className="h-12 w-full rounded-md border-2 border-muted-foreground p-3"
                        >
                          <option value="">UF</option>
                          {estadosBrasileiros.map((estado) => (
                            <option key={estado} value={estado}>
                              {estado}
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
                  name="bairro"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Bairro"
                          {...field}
                          className="h-12 w-full rounded-md border-2 border-muted-foreground p-4"
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
                          className="h-12 w-full rounded-md border-2 border-muted-foreground p-4"
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
                          placeholder="additionalInfo"
                          {...field}
                          className="h-12 w-full rounded-md border-2 border-muted-foreground p-4"
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
                          className="h-12 w-full rounded-md border-2 border-muted-foreground p-4"
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
                          placeholder="city"
                          {...field}
                          className="h-12 w-full rounded-md border-2 border-muted-foreground p-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                id="map"
                className="top-12 z-20 mx-auto flex w-[80%] items-center justify-center md:w-2/3"
              >
                <iframe
                  title="Google Maps"
                  width="100%"
                  height="100%"
                  className="rounded-xl border-0"
                  src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>
              <Button
                type="submit"
                className="h-12 rounded-[45.5px] border-4 border-[#FB3D01] bg-white text-xl font-semibold text-[#FB3D01] md:w-1/2"
              >
                {initialData ? "Salvar Alterações" : "Adicionar Endereço"}
              </Button>
            </form>
          </FormProvider>
        </div>

        <div className="hidden lg:flex">
          <img className="max-h-[700px]" src={ilustra} alt="" />
        </div>
      </div>
    </>
  )
}
