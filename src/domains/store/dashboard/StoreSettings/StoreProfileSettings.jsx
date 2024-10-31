import { zodResolver } from "@hookform/resolvers/zod"
import { IconCamera } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { useFetch } from "@/app/hooks/useFetch"
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
import { Loading } from "@/ui/components/ui/loading"
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
import { restaurantService } from "../../services/restaurantService"
import { ModalCoverphoto } from "./ModalCoverphoto"
import { ModalProfilePhoto } from "./ModalProfilePhoto"
import { ModalSaveChanges } from "./ModalSaveChanges"

export function StoreProfileSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false)
  const [isModalSaveChangesOpen, setIsModalSaveChangesProfileOpen] =
    useState(false)
  const { loading, onRequest } = useFetch()
  const [storeInformation, setStoreInformation] = useState({
    urlBanner: "",
    urlLogo: "",
    restaurantId: "",
    fantasy: "",
    cnpj: "",
    phone: "",
    category: "",
    description: "",
  })

  const form = useForm({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      restaurantId: storeInformation?.restaurantId,
      fantasy: storeInformation?.fantasy,
      cnpj: storeInformation?.cnpj,
      phone: storeInformation?.phone,
      category: storeInformation?.category,
      description: storeInformation?.description || "",
    },
  })

  const { reset } = form
  const fetchStoreProfileSettings = async () => {
    await onRequest({
      request: () => restaurantService.getRestaurant(),
      onSuccess: (data) => {
        reset(data), setStoreInformation({ ...data })
      },
    })
  }

  useEffect(() => {
    fetchStoreProfileSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async () => {
    await onRequest({
      request: () => restaurantService.updateRestaurant(form.getValues()),
      onSuccess: () => setIsModalSaveChangesProfileOpen(false),
      onError: () => setIsModalSaveChangesProfileOpen(false),
      successMessage: "Dados atualizado",
    })
  }

  const formPlaceholders = {
    restaurantId: "ID da Loja",
    fantasy: "Nome da Loja",
    category: "Escolha uma categoria...",
    description: "Fale mais sobre seu estabelecimento",
  }
  const toggleOpenModal = () => {
    setIsModalOpen((prev) => !prev)
  }
  const toggleOpenModalProfile = () => {
    setIsModalProfileOpen((prev) => !prev)
  }
  const toggleOpenModalSaveChanges = () =>
    setIsModalSaveChangesProfileOpen((prev) => !prev)

  // todo: puxar do banco as categorias
  const categories = [
    {
      id: "RESTAURANTE",
      category: "RESTAURANTE",
    },
    {
      id: "PADARIA",
      category: "PADARIA",
    },
    {
      id: "SUPERMERCADO",
      category: "SUPERMERCADO",
    },
    {
      id: "LANCHERIA",
      category: "LANCHERIA",
    },
  ]

  if (loading) {
    return <Loading />
  }
  return (
    <div className="m-4 w-auto lg:m-8">
      <div className="flex flex-col gap-0">
        <h1 className="text-3xl font-semibold text-gray-600 md:text-4xl lg:mb-0">
          Perfil
        </h1>
        <p className="text-base font-semibold text-gray-500 lg:text-lg">
          Ajuste as informações da sua loja
        </p>
      </div>

      <div className="relative mb-14 mt-4 flex flex-col items-center">
        <div className="relative h-40 w-full">
          <img
            src={storeInformation.urlBanner}
            alt={`Imagem de fundo da loja ${storeInformation.fantasy}`}
            className="h-full w-full rounded-xl border-2 border-gray-400 object-cover"
          />

          <Button
            onClick={() => toggleOpenModal()}
            className="absolute right-0 top-0 m-2 rounded-md bg-black p-1 transition hover:ease-in"
          >
            <IconCamera className="text-white" size={30} />
          </Button>
        </div>

        <div className="absolute bottom-0 flex h-24 w-24 pt-12">
          <img
            src={storeInformation.urlLogo}
            alt={`Imagem de perfil da loja ${storeInformation.fantasy}`}
            className="h-24 w-24 rounded-full border-2 border-white object-cover"
          />
          <Button
            onClick={() => toggleOpenModalProfile()}
            className="absolute -bottom-14 -right-5 m-2 rounded-md bg-black p-1 transition hover:ease-in"
          >
            <IconCamera className="text-white" size={30} />
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            toggleOpenModalSaveChanges()
          })}
          className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-14"
        >
          <div className="order-1 flex flex-col gap-6">
            <FormField
              className="flex flex-col gap-1"
              id="restaurantId"
              name="restaurantId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID da loja</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={formPlaceholders.restaurantId}
                      disabled={true}
                      className="w-full resize-none rounded-md border border-gray-400 bg-slate-200 p-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              className="flex flex-col gap-1"
              id="fantasy"
              name="fantasy"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da loja</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={formPlaceholders.fantasy}
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
              id="cnpj"
              name="cnpj"
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
              id="phone"
              name="phone"
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
              id="description"
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descrição da loja</FormLabel>
                  <FormControl>
                    <Textarea
                      type="text"
                      placeholder={formPlaceholders.description}
                      className="h-20 resize-none rounded-md border border-gray-400 p-2 outline-orange-500"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="order-4 flex h-full w-full flex-col items-center gap-12 lg:order-3 lg:flex-col-reverse lg:items-end lg:justify-center">
            <FormField
              id="category"
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Select
                      className="w-full border-4 border-gray-400"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Categoria" />
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
              <Button disabled={loading} className="w-full">
                Salvar alterações
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <ModalCoverphoto
        toggleOpenModal={toggleOpenModal}
        isModalOpen={isModalOpen}
        storeInformation={form.getValues()}
        fetchStoreProfileSettings={fetchStoreProfileSettings}
      />
      <ModalProfilePhoto
        toggleOpenModal={toggleOpenModalProfile}
        isModalOpen={isModalProfileOpen}
        storeInformation={form.getValues()}
        fetchStoreProfileSettings={fetchStoreProfileSettings}
      />

      <ModalSaveChanges
        toggleOpenModal={toggleOpenModalSaveChanges}
        isModalOpen={isModalSaveChangesOpen}
        onConfirm={onSubmit}
      />
    </div>
  )
}
