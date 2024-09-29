import { zodResolver } from "@hookform/resolvers/zod"
import { IconSearch } from "@tabler/icons-react"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/ui/components/ui/button/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/ui/components/ui/form/form"
import { Input } from "@/ui/components/ui/input"

// Lista de estados brasileiros
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

// Definindo o esquema Zod com validação para UF
const FormSchema = z.object({
  cep: z.string().min(8, { message: "Insira um CEP válido com 8 caracteres." }),
  endereco: z
    .string()
    .min(5, { message: "O endereço deve ter pelo menos 5 caracteres." }),
  numero: z.string().min(1, { message: "Insira o número." }),
  apto: z.string().optional(),
  complemento: z.string().optional(),
  cidade: z
    .string()
    .min(3, { message: "Cidade deve ter pelo menos 3 caracteres." }),
  uf: z.enum(estadosBrasileiros, { message: "Selecione um estado válido." }),
})

// Função para buscar endereço na API do ViaCEP
const useFetchCep = (cep, setValue) => {
  useEffect(() => {
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            setValue("endereco", data.logradouro)
            setValue("complemento", data.complemento)
            setValue("cidade", data.localidade)
            setValue("uf", data.uf)
          }
        })
        .catch(() => console.error("Erro ao buscar CEP"))
    }
  }, [cep, setValue])
}

export function AddressForm() {
  const formMethods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cep: "",
      endereco: "",
      numero: "",
      apto: "",
      complemento: "",
      cidade: "",
      uf: "",
    },
  })

  const { register, watch, setValue } = formMethods

  const cep = watch("cep")
  useFetchCep(cep, setValue)

  function onSubmit(data) {
    console.log(data)
  }

  return (
    <div className="relative h-[900px] w-[360px] bg-white p-4">
      <h2 className="p-4 text-center text-xl font-bold text-[#1E1F2B]">
        Adicionar Endereço
      </h2>

      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="relative h-screen space-y-6"
        >
          {/* Campo de pesquisa de CEP */}
          <div className="relative w-full">
            <Input
              placeholder="Pesquisar CEP"
              className="h-12 w-full rounded-[12px] border-2 border-[#B6BAD3] pr-4"
              {...register("cep")}
            />
            <IconSearch className="absolute right-3 top-1/2 -translate-y-1/2 transform text-[#B6BAD3]" />
          </div>

          <FormField
            control={formMethods.control}
            name="endereco"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Rua"
                    {...field}
                    className="h-12 w-full rounded-[12px] border-2 border-[#B6BAD3] p-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4">
            <FormField
              control={formMethods.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Número"
                      {...field}
                      className="h-12 w-full rounded-[12px] border-2 border-[#B6BAD3] p-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formMethods.control}
              name="apto"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Apto"
                      {...field}
                      className="h-12 w-full rounded-[12px] border-2 border-[#B6BAD3] p-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={formMethods.control}
            name="complemento"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Complemento"
                    {...field}
                    className="h-12 w-full rounded-[12px] border-2 border-[#B6BAD3] p-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campos de cidade e UF */}
          <FormField
            control={formMethods.control}
            name="cidade"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Cidade"
                    {...field}
                    className="h-12 w-full rounded-[12px] border-2 border-[#B6BAD3] p-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formMethods.control}
            name="uf"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <select
                    {...field}
                    className="h-12 w-full rounded-[12px] border-2 border-[#B6BAD3] p-3"
                  >
                    <option value="">Selecione um estado</option>
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

          <Button
            type="submit"
            className="absolute bottom-0 left-0 h-12 w-full rounded-[45.5px] border-4 border-[#FB3D01] bg-white text-xl font-semibold text-[#FB3D01]"
          >
            Adicionar Endereço
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
