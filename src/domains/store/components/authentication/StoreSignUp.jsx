import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { Button } from "@/ui/components/ui/button/button"
import { CepPatternFormat } from "@/ui/components/ui/cep-pattern-format"
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
import { PasswordInput } from "@/ui/components/ui/passwordInput"
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
import { TextWithLink } from "@/ui/components/ui/TextWithLink"

import { states } from "../../models/StoreAddressType"
import { storeFormSchemaSignUp } from "../../models/StoreSignUpTypes"
import { restaurantService } from "../../services/restaurantService"

export function StoreSignUp() {
  const navigate = useNavigate()
  const { onRequest } = useFetch()

  const form = useForm({
    resolver: zodResolver(storeFormSchemaSignUp),
    defaultValues: {
      fantasy: "",
      cnpj: "",
      phone: "",
      category: "",
      email: "",
      password: "",
      address: {
        cep: "",
        state: "",
        street: "",
        complement: "",
        number: "",
        city: "",
      },
    },
  })

  const onSubmit = async (data) => {
    await onRequest({
      request: () =>
        restaurantService.createRestaurant({
          ...data,
          address: {
            ...data.address,
            type: "LOJA",
            isStandard: true,
            addressType: "RESTAURANT",
          },
        }),
      onSuccess: () => navigate("/autenticar/negocios"),
      successMessage: "Restaurante criado com sucesso",
    })
  }

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

  console.log(form.formState.errors)

  return (
    <div className="grid gap-2 sm:px-8">
      <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
        Criar conta
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-5 text-start sm:grid-cols-2"
        >
          <section className="flex flex-col gap-3">
            <FormField
              id="fantasy"
              name="fantasy"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da loja</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite o nome da loja"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
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
                      placeholder="Email@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
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

            <FormField
              id="password"
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      className={"!mt-1"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className={"text-xs"} />
                </FormItem>
              )}
            />
          </section>
          <section className="grid gap-3">
            <div className="grid grid-cols-1 gap-2 rounded-lg md:grid-cols-2">
              <FormField
                control={form.control}
                name="address.cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cep</FormLabel>
                    <FormControl>
                      <CepPatternFormat {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UF</FormLabel>
                    <FormControl>
                      <select
                        required
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="" disabled>
                          UF
                        </option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Cidade" {...field} />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Bairro" {...field} />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua" {...field} />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nº</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Número"
                      {...field}
                      className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input placeholder="Complemento" {...field} />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
          </section>
          <Button
            type="submit"
            className="col-span-full w-full sm:w-auto md:text-right"
          >
            Criar conta
          </Button>
        </form>
      </Form>
      <TextWithLink
        text="Já tem conta?"
        buttonContent="Faça Login"
        navigateTo={"/autenticar/negocios"}
      />
      <TextWithLink
        text="É um cliente?"
        buttonContent="Criar conta"
        navigateTo={"/autenticar/criar-conta"}
      />
    </div>
  )
}
