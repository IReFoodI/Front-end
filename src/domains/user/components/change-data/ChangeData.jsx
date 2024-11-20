import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { localStorageUtil } from "@/app/utils/localStorageUtil"
import { ModalSaveChanges } from "@/domains/store/dashboard/StoreSettings/ModalSaveChanges"
import { Button } from "@/ui/components/ui/button/button"
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

import { formSchema } from "../../models/MyProfileDataTypes"
import { userService } from "../../services/userService"
import useUserStore from "../../stores/useUserStore"
import { ModalCancel } from "./ModalCancel"

export function ChangeData() {
  const navigate = useNavigate()
  const { setUser } = useUserStore()
  const [isModalSaveChangesOpen, setIsModalSaveChangesOpen] = useState(false)
  const { loading, onRequest } = useFetch()

  const toggleOpenModalSaveChanges = () =>
    setIsModalSaveChangesOpen((prev) => !prev)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  })

  const fetchStoreProfileSettings = async () => {
    await onRequest({
      request: () => userService.getUserInformation(),
      onSuccess: (data) => {
        setUser(data)
        form.reset(data)
      },
    })
  }

  useEffect(() => {
    fetchStoreProfileSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async () => {
    await onRequest({
      request: () =>
        userService.updateUser({
          ...form.getValues(),
          password: "deafult",
          phone: form.getValues().phone.replace(/[^\d]/g, ""),
        }),
      onSuccess: (data) => {
        setUser(data.user)
        localStorageUtil.setLocalStorageToken(data.jwt)
        setIsModalSaveChangesOpen(false)
        navigate("/meus-dados")
      },
      successMessage: "Dados atualizado",
    })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <h1 className="fixed left-1/2 -translate-x-1/2 transform text-center text-2xl font-semibold">
        Alterar Dados
      </h1>

      <div className="w-full justify-between pt-24">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              toggleOpenModalSaveChanges()
            })}
            className="grid gap-2 text-left"
          >
            <FormField
              id="name"
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nome completo"
                      className={"!mt-1"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className={"text-xs"} />
                </FormItem>
              )}
            />

            <FormField
              id="email"
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className={"!mt-1"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className={"text-xs"} />
                </FormItem>
              )}
            />
            <FormField
              id="phone"
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contato</FormLabel>
                  <FormControl>
                    <PhonePatternFormat {...field} />
                  </FormControl>
                  <FormMessage className={"text-xs"} />
                </FormItem>
              )}
            />
            <div className="mt-9 flex flex-col justify-end gap-2 sm:flex-row">
              <ModalCancel className={"order-2"} />
              <Button className={"order-1"}>Salvar alterações</Button>
            </div>
          </form>
        </Form>
      </div>
      <ModalSaveChanges
        toggleOpenModal={toggleOpenModalSaveChanges}
        isModalOpen={isModalSaveChangesOpen}
        onConfirm={onSubmit}
      />
    </>
  )
}
