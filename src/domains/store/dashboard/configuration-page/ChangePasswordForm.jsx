import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { PasswordInput } from "@/ui/components/ui/passwordInput"

import { changePasswordTypes } from "../../models/dashboard/ChangePasswordTypes"

export function ChangePasswordForm() {
  const form = useForm({
    resolver: zodResolver(changePasswordTypes),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data) => {
    toast.success("Troca de senha efetuada com sucesso!")
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-2 text-left"
      >
        <FormField
          id="oldPassword"
          name="oldPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha atual</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Senha atual"
                  className={"!mt-1"}
                  {...field}
                />
              </FormControl>
              <FormMessage className={"text-xs"} />
            </FormItem>
          )}
        />
        <FormField
          id="password"
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Senha nova"
                  className={"!mt-1"}
                  {...field}
                />
              </FormControl>
              <FormMessage className={"text-xs"} />
            </FormItem>
          )}
        />
        <FormField
          id="confirmPassword"
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Senha nova"
                  className={"!mt-1"}
                  {...field}
                />
              </FormControl>
              <FormMessage className={"text-xs"} />
            </FormItem>
          )}
        />

        <Button type="submit">Trocar senha</Button>
      </form>
    </Form>
  )
}
