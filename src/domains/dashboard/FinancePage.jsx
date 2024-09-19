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
        <div className="my-8 flex w-full justify-between">
          <h1 className="text-3xl font-semibold">Finanças</h1>
          <div>
            <DatePicker />
          </div>
        </div>

        <section className="grid w-full grid-cols-12 gap-4 transition-all">
          <div className="col-span-5">
            <Card className="bg-primary text-white">
              <CardHeader>
                <CardTitle>Pedidos hoje - Ticket médio hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <p>1 - R$ 80,00</p>
              </CardContent>
              <CardFooter>
                <p>R$ 80,00</p>
              </CardFooter>
            </Card>
          </div>

          <div className="col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos do mês Ticket médio mês</CardTitle>
              </CardHeader>
              <CardContent>
                <p>1 - R$ 80,00</p>
              </CardContent>
              <CardFooter>
                <p>R$ 80,00</p>
              </CardFooter>
            </Card>
          </div>

          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Avaliações</CardTitle>
              </CardHeader>
              <CardContent>
                <p>4,0</p>
              </CardContent>
              <CardFooter>
                <p>estrelas</p>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section className="mt-5 grid w-full grid-cols-12 gap-4 transition-all lg:grid-cols-12">
          <Card className="col-span-8">
            <CardContent>
              <p className="p-4 text-xl font-semibold">Overview</p>
              <ChartCard />
            </CardContent>
          </Card>
          <div className="col-span-4 flex flex-col gap-5">
            <Card>
              <CardHeader>
                <CardTitle>Total faturado no mês</CardTitle>
              </CardHeader>
              <CardContent>
                <p>R$800,00</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pedidos aceitos do mês</CardTitle>
              </CardHeader>
              <CardContent>
                <p>124</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pedidos cancelados do mês</CardTitle>
              </CardHeader>
              <CardContent>
                <p>0</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
