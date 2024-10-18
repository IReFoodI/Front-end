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
        className="flex h-full w-full flex-col gap-2 text-left"
      >
        <FormField
          id="oldEmail"
          name="oldEmail"
          control={form.control}
          className="flex w-full justify-start"
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full justify-start gap-2">
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
        <div className="flex w-full flex-1 flex-col justify-end gap-2">
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
        </div>

        <Button type="submit" className="w-full">
          Trocar email
        </Button>
      </form>
    </Form>
  )
}
