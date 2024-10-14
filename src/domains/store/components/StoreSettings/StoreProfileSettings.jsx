import { zodResolver } from "@hookform/resolvers/zod"
import { IconCamera } from "@tabler/icons-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/ui/components/ui/button/button"
import { CnpjPatternFormat } from "@/ui/components/ui/CNPJ-pattern-format"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/components/ui/form/form"
import { Input } from "@/ui/components/ui/input"
import { PhonePatternFormat } from "@/ui/components/ui/phone-pattern-format"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/ui/select"
import { Textarea } from "@/ui/components/ui/textarea"

import { storeFormSchema } from "../../models/StoreAccountTypes"

export function StoreProfileSettings() {
  const [storeInformation] = useState({
    storeCoverImage: "",
    storeProfileImage: "",
    storeID: "",
    storeName: "",
    storeCNPJ: "",
    storePhone: "",
    storeCategory: "",
    storeDescription: "",
  })

  const form = useForm({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      storeID: storeInformation?.storeID,
      storeName: storeInformation?.storeName,
      storeCNPJ: storeInformation?.storeCNPJ,
      storePhone: storeInformation?.storePhone,
      storeCategory: storeInformation?.storeCategory,
      storeDescription: storeInformation?.storeDescription,
    },
  })

  const formPlaceholders = {
    storeID: "ID da Loja",
    storeName: "Nome da Loja",
    storeCategory: "Escolha uma categoria...",
    storeDescription: "A descrição da loja vai vir aqui...",
  }

  const categories = [
    {
      id: 1,
      category: "Lanches",
    },
    {
      id: 2,
      category: "Teste 1",
    },
    {
      id: 3,
      category: "Teste 2",
    },
    {
      id: 4,
      category: "Teste 3",
    },
    {
      id: 5,
      category: "Teste 4",
    },
  ]

  function onSubmit(data) {
    toast.success("Conta atualizada com sucesso!")
    console.log(data)
  }

  return (
    <div className="m-4 w-full lg:m-8">
      <div className="flex flex-col gap-0">
        <h1 className="text-3xl font-semibold lg:mb-0 lg:text-4xl">Perfil</h1>
        <p className="text-base font-semibold text-zinc-500 lg:text-lg">
          Ajuste as informações da sua loja
        </p>
      </div>

      <div className="relative mb-14 mt-4 flex flex-col items-center">
        <div className="relative h-64 w-full">
          <img
            src={storeInformation.storeCoverImage}
            alt={`Imagem de fundo da loja ${storeInformation.storeName}`}
            className="h-full w-full rounded-xl border-2 border-zinc-400 object-cover"
          />

          <button className="absolute right-0 top-0 m-2 rounded-md bg-black p-1 transition hover:bg-orange-500 hover:ease-in">
            <IconCamera className="text-white" size={32} />
          </button>
        </div>

        <div className="absolute bottom-0 flex h-24 w-24 pt-12">
          <img
            src={storeInformation.storeProfileImage}
            alt={`Imagem de perfil da loja ${storeInformation.storeName}`}
            className="h-24 w-24 rounded-full border-2 border-white object-cover"
          />
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-14"
        >
          <div className="order-1 flex flex-col gap-6">
            <FormField
              className="flex flex-col gap-1"
              id="storeID"
              name="storeID"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID da loja</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={formPlaceholders.storeID}
                      disabled={true}
                      className="w-full resize-none rounded-md border border-zinc-400 bg-slate-200 p-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              className="flex flex-col gap-1"
              id="storeName"
              name="storeName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da loja</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={formPlaceholders.storeName}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="order-2 flex flex-col gap-6">
            <FormField
              className="flex flex-col gap-1"
              id="storeCNPJ"
              name="storeCNPJ"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <CnpjPatternFormat {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              className="flex flex-col gap-1"
              id="storePhone"
              name="storePhone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone de contato</FormLabel>
                  <FormControl>
                    <PhonePatternFormat {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="order-3 flex w-full flex-col gap-6 lg:order-4 lg:col-span-3 lg:mt-2 lg:items-end">
            <FormField
              className="flex flex-col gap-1 lg:order-2"
              id="storeDescription"
              name="storeDescription"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descrição da loja</FormLabel>
                  <FormControl>
                    <Textarea
                      type="text"
                      placeholder={formPlaceholders.storeDescription}
                      className="h-32 resize-none rounded-md border border-zinc-400 p-2 outline-orange-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="order-4 flex h-full w-full flex-col items-center gap-12 lg:order-3 lg:flex-col-reverse lg:items-end lg:justify-center">
            <FormField
              className="flex w-full flex-col gap-1"
              id="storeCategory"
              name="storeCategory"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Categoria</FormLabel>
                  <FormControl className="">
                    <Select
                      className="w-full border-4 border-zinc-400"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={formPlaceholders.storeCategory}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categorias</SelectLabel>
                          {categories?.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.category}
                            >
                              {category.category}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="lg:order-1">
              <Button className="w-full">Salvar alterações</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
