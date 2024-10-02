import {
  IconCurrencyDollar,
  IconShoppingCart,
  IconSquareX,
} from "@tabler/icons-react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/components/ui/card"

import { ChartCard } from "./ChartCard"
import { DatePicker } from "./DatePicker"

export function FinancePage() {
  return (
    <div className="flex-grow p-4">
      <main className="mx-auto flex w-full max-w-[1216px] flex-col items-center text-gray-600 antialiased lg:h-auto">
        <div className="mb-5 mt-4 flex w-full flex-col justify-between sm:flex-row">
          <h1 className="mb-4 text-3xl font-semibold sm:mb-0">Finanças</h1>
          <div>
            <DatePicker />
          </div>
        </div>

        <section className="grid w-full grid-cols-12 gap-4 text-xl font-semibold transition-all sm:grid-cols-6 lg:grid-cols-12">
          <div className="col-span-12 sm:col-span-6 lg:col-span-5">
            <Card className="bg-primary text-white">
              <div className="flex gap-[0%] sm:gap-[10%] md:gap-[0%] lg:gap-[10%]">
                <div>
                  <CardHeader className="flex justify-between">
                    <CardTitle>Pedidos hoje</CardTitle>
                  </CardHeader>
                  <CardContent className="text-4xl">
                    <p>1</p>
                  </CardContent>
                </div>
                <div>
                  <CardHeader className="flex justify-between">
                    <CardTitle>Ticket médio hoje</CardTitle>
                  </CardHeader>
                  <CardContent className="text-4xl">
                    <p>R$ 80,00</p>
                  </CardContent>
                </div>
              </div>
              <CardFooter>
                <p>R$ 80,00</p>
              </CardFooter>
            </Card>
          </div>

          <div className="col-span-12 sm:col-span-3 lg:col-span-5">
            <Card>
              <div className="flex gap-[0%] sm:gap-[10%] md:gap-[0%] lg:gap-[10%]">
                <div>
                  <CardHeader className="flex justify-between">
                    <CardTitle className="text-gray-500">
                      Pedidos do mês
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-4xl text-primary">
                    <p>1</p>
                  </CardContent>
                </div>
                <div>
                  <CardHeader className="flex justify-between">
                    <CardTitle className="text-gray-500">
                      Ticket médio mês
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-4xl text-primary">
                    <p>R$ 80,00</p>
                  </CardContent>
                </div>
              </div>
              <CardFooter className="text-gray-500">
                <p>R$ 80,00</p>
              </CardFooter>
            </Card>
          </div>

          <div className="col-span-12 sm:col-span-3 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-500">Avaliações</CardTitle>
              </CardHeader>
              <CardContent className="text-4xl text-primary">
                <p>4,0</p>
              </CardContent>
              <CardFooter className="text-gray-500">
                <p>estrelas</p>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section className="mt-5 grid w-full grid-cols-12 gap-4 transition-all sm:grid-cols-6 lg:grid-cols-12">
          <Card className="col-span-12 sm:col-span-6 lg:col-span-8">
            <CardContent className="ps-1">
              <p className="p-4 text-xl font-semibold">Overview</p>
              <ChartCard />
            </CardContent>
          </Card>
          <div className="col-span-12 flex flex-col gap-5 text-xl font-semibold sm:col-span-6 lg:col-span-4">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-500">
                  <p>Pedidos aceitos do mês</p>
                  <p>
                    <IconShoppingCart size={40} />
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-4xl text-primary">
                <p>124</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-500">
                  <p>Pedidos cancelados do mês</p>
                  <p>
                    <IconSquareX size={40} />
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-4xl text-primary">
                <p>0</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
