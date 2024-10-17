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
import { Input } from "@/ui/components/ui/input"

import { changeEmailTypes } from "../../models/dashboard/ChangeEmailTypes"

export function ChangeEmailForm() {
  const currentEmail = "johndoe@example.com"

  const form = useForm({
    resolver: zodResolver(changeEmailTypes),
    defaultValues: {
      oldEmail: currentEmail,
      email: "",
      confirmEmail: "",
    },
  })

  const onSubmit = (data) => {
    toast.success("Troca de e-mail efetuada com sucesso!")
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-2 text-left lg:items-end"
      >
        <FormField
          id="oldEmail"
          name="oldEmail"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full gap-2">
                <p className="items-start text-sm text-zinc-800">
                  E-mail atual:{" "}
                </p>
                <FormControl>
                  <input
                    type="email"
                    placeholder="E-mail Atual"
                    className={"bg-transparent text-sm text-primary"}
                    disabled
                    {...field}
                  />
                </FormControl>
              </div>
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
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="E-mail"
                  className={"!mt-1"}
                  {...field}
                />
              </FormControl>
              <FormMessage className={"text-xs"} />
            </FormItem>
          )}
        />

        <FormField
          id="confirmEmail"
          name="confirmEmail"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="E-mail"
                  className={"!mt-1"}
                  {...field}
                />
              </FormControl>
              <FormMessage className={"text-xs"} />
            </FormItem>
          )}
        />

        <Button type="submit">Trocar email</Button>
      </form>
    </Form>
  )
}
