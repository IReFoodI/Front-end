import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

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
import { PhonePatternFormat } from "@/ui/components/ui/phone-pattern-format"

import ilustra from "../../../../ui/assets/ilustra.png"
import { ModalCancel } from "./ModalCancel"

//objeto temporário
const profileData = {
  name: "Samilis",
  email: "samilisbritto@gmail.com",
  phone: "91993559449",
}

const phoneRegex = /^\+?[1-9]\d{1,14}$/

const formSchema = z.object({
  name: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(2, { message: "Tamanho mínimo de 2 caracter" }),
  email: z
    .string({
      required_error: "Campo obrigatório",
    })
    .email({ message: "Formato de e-mail inválido" }),
  phone: z
    .string({
      required_error: "Campo obrigatório",
    })
    .regex(phoneRegex, { message: "Número de telefone inválido" }),
})

export function MyProfileData() {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profileData.name,
      phone: profileData.phone,
      email: profileData.email,
    },
  })

  function onSubmit(data) {
    console.log(data) // enviar para o back
    toast.success("Informações alteradas com sucesso")
    navigate("/my-profile") //todo: ajustar rota
  }

  return (
    <>
      <div
        id="page"
        className="mx-auto flex h-screen w-full max-w-[1216px] flex-col items-center text-gray-600 antialiased lg:h-auto"
      >
        <h1 className="w-full pb-6 pt-7 text-center text-2xl font-semibold lg:py-10">
          Alterar Dados
        </h1>
        <div className="flex w-full">
          <div className="flex w-full flex-col justify-between px-5 sm:w-1/2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
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
                <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-5">
                  <Button className="order-2" type="submit">
                    Salvar
                  </Button>
                  <ModalCancel />
                </div>
              </form>
            </Form>
          </div>
          <div className="hidden sm:flex">
            <img className="max-h-[700px]" src={ilustra} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}
