import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "@/ui/components/ui/button/button"
import { Input } from "@/ui/components/ui/input"
import { TextWithLink } from "@/ui/components/ui/TextWithLink"

import logo from "./Logo-Negocios.png"
import { SocialAuthButtons } from "./SocialAuthButtons"

export function DashboardLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = (event) => {
    event.preventDefault()

    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.")
      return
    }

    toast.success("Login realizado com sucesso! Bem-vindo(a) de volta!")
    console.log({ email, password })
    navigate("/home")
  }

  return (
    <div className="relative -z-20 flex min-h-screen flex-col items-center justify-center gap-8 bg-dashboard-login bg-cover bg-center p-4 md:flex-row lg:gap-20">
      <div className="absolute left-0 top-0 -z-10 h-screen w-screen bg-gradient-to-r from-black/95 via-black/40 to-black/35" />
      <div className="max-w-lg text-center md:text-left">
        <h1 className="mb-8 text-5xl font-semibold text-white">
          Seu negócio com{" "}
          <span className="font-bold">agilidade na gestão.</span>
        </h1>
        <div className="flex justify-center md:justify-start">
          <img src={logo} alt="" />
        </div>
      </div>
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-center text-2xl font-semibold text-foreground md:text-3xl">
          Login
        </h1>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              <Input
                type="email"
                id="email"
                placeholder="Email"
                className="mt-1 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              <Input
                type="password"
                id="password"
                placeholder="Senha"
                className="mt-1 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <Button type="submit" className="w-full rounded-full">
            Entrar
          </Button>
        </form>

        <TextWithLink
          text="Esqueceu sua senha?"
          buttonContent="Recuperar senha"
          navigateTo="/recover-password"
        />

        <SocialAuthButtons />

        <TextWithLink
          text="Ainda não tem conta?"
          buttonContent="Criar conta"
          navigateTo="/create-account"
        />
      </div>
    </div>
  )
}
