import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PatternFormat } from "react-number-format"
import { useNavigate } from "react-router-dom"
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

  const onSubmit = (data) => {
    console.log(data)
    navigate("/my-profile") //todo: ajustar rota
  }

  return (
    <>
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
                  <PatternFormat
                    format="(##) #####-####"
                    allowEmptyFormatting
                    mask="_"
                    className="input !mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-[50%]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className={"text-xs"} />
              </FormItem>
            )}
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-5">
            <Button className="order-2" type="submit">
              Salvar
            </Button>
            <Button
              className="order-1"
              variant="outline"
              onClick={() => navigate("/my-profile")} //ajustar rota
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
