import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

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

import { formSchema } from "../../models/MyProfileDataTypes"
import { ModalCancel } from "./ModalCancel"

//todo objeto temporário
const profileData = {
  name: "Samilis",
  email: "samilisbritto@gmail.com",
  phone: "91993559449",
}

export function ChangeData() {
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
      <h1 className="col-span-full w-full pb-6 pt-7 text-center text-2xl font-semibold lg:py-10">
        Alterar Dados
      </h1>

      <div className="w-full justify-between">
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
              <ModalCancel />
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
