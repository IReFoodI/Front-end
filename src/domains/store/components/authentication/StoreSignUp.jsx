import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "sonner"

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
import { TextWithLink } from "@/ui/components/ui/TextWithLink"

import { SocialAuthButtons } from "../../../../ui/components/SocialAuthButtons"
import { states } from "../../models/StoreAddressType"
import { storeFormSchemaSignUp } from "../../models/StoreSignUpTypes"

export function StoreSignUp() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectPath = searchParams.get("redirect")

  const form = useForm({
    resolver: zodResolver(storeFormSchemaSignUp),
    defaultValues: {
      storeName: "",
      storeCNPJ: "",
      storePhone: "",
      storeCategory: "",
      storeDescription: "",
      cep: "",
      state: "",
      district: "",
      street: "",
      complement: "",
      number: "",
      type: "",
      city: "",
    },
  })

  console.log(location)
  const onSubmit = (data) => {
    toast.success("Login realizado com sucesso! Bem-vindo(a) de volta!")
    console.log(data)
    if (redirectPath) {
      navigate(redirectPath)
    } else {
      navigate(location.pathname == "/autenticar/negocios" ? "/dashboard" : "/")
    }
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
              id="storeName"
              name="storeName"
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
              id="storeCategory"
              name="storeCategory"
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

            <FormField
              id="storeDescription"
              name="storeDescription"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descrição da loja</FormLabel>
                  <FormControl>
                    <Textarea
                      type="text"
                      placeholder="Digite a descrição da loja"
                      className="h-8 resize-none rounded-md border p-2 outline-orange-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </section>
          <section className="grid gap-3">
            <div className="grid grid-cols-1 gap-2 rounded-lg md:grid-cols-2">
              <FormField
                control={form.control}
                name="cep"
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
                name="state"
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
              name="city"
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
              name="district"
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
              name="street"
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
              name="number"
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
              name="complement"
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
        text="Esqueceu sua senha?"
        buttonContent="Recuperar senha"
        navigateTo="/autenticar/recuperar-senha"
      />
      {location.pathname == "/autenticar/entrar" && (
        <SocialAuthButtons
          locationPathname={location?.pathname}
          redirectPath={redirectPath}
        />
      )}

      <TextWithLink
        text="Ainda não tem conta?"
        buttonContent="Criar conta"
        navigateTo={
          location?.pathname === "/autenticar/negocios"
            ? "/autenticar/negocios/criar-conta"
            : "/autenticar/criar-conta"
        }
      />
    </div>
  )
}
