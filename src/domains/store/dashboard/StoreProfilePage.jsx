import {
  IconClockHour4,
  IconCurrencyDollar,
  IconShoppingBag,
  IconShoppingCart,
} from "@tabler/icons-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/components/ui/card"

import { ChartCard } from "./ChartCard"

export function StoreProfilePage() {
  return (
    <div className="flex-grow p-4">
      <main className="mx-auto flex w-full max-w-[1216px] flex-col items-center text-gray-600 antialiased lg:h-auto">
        <div className="mb-5 mt-4 flex w-full flex-col justify-between sm:flex-row">
          <h1 className="mb-4 text-3xl font-semibold">
            Olá, [Nome do Restaurente]
          </h1>
        </div>

        <section className="grid w-full grid-cols-12 gap-4 text-xl font-semibold transition-all sm:grid-cols-6 lg:grid-cols-12">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-500">
                  <p>Itens ativos no cardápio</p>
                  <p>
                    <IconShoppingCart size={40} />
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-4xl text-primary">
                <p>0</p>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 sm:col-span-3 lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-500">
                  <p>Total faturado no mês</p>
                  <p>
                    <IconCurrencyDollar size={40} />
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-4xl text-primary">
                <p>R$800,00</p>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 sm:col-span-3 lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-500">
                  <p>Pedidos no mês</p>
                  <p>
                    <IconShoppingBag size={40} />
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-4xl text-primary">
                <p>0</p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="mt-5 grid w-full grid-cols-12 gap-4 transition-all sm:grid-cols-6 lg:grid-cols-12">
          <div className="col-span-12 flex flex-col gap-5 text-xl font-semibold sm:col-span-6 lg:col-span-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-500">
                  <p>Horário de Funcionamento</p>
                  <p>
                    <IconClockHour4 size={40} />
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 text-sm text-gray-500">
                <span className="flex justify-between">
                  <p>Segunda-feira</p> <p>08:00 às 18:00</p>
                </span>
                <span className="flex justify-between">
                  <p>Terça-feira</p> <p>08:00 às 18:00</p>
                </span>
                <span className="flex justify-between">
                  <p>Quarta-feira</p> <p>08:00 às 18:00</p>
                </span>
                <span className="flex justify-between">
                  <p>Quinta-feira</p> <p>08:00 às 18:00</p>
                </span>
                <span className="flex justify-between">
                  <p>Sexta-feira</p> <p>08:00 às 18:00</p>
                </span>
                <span className="flex justify-between">
                  <p>Sábado</p> <p>Fechado</p>
                </span>
                <span className="flex justify-between">
                  <p>Domingo</p> <p>Fechado</p>
                </span>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-xl font-semibold sm:col-span-6 lg:col-span-8">
            <Card className="col-span-12 sm:col-span-6 lg:col-span-8">
              <CardContent className="ps-1">
                <p className="p-4 text-xl font-semibold">Overview</p>
                <ChartCard />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
