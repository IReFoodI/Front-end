import {
  IconClockHour4,
  IconCurrencyDollar,
  IconShoppingBag,
  IconShoppingCart,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"
import { currencyFormatter } from "@/app/utils/currencyFormatter"
import userStore from "@/domains/user/stores/userStore"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/components/ui/card"

import { restaurantService } from "../services/restaurantService"
import { ChartCard } from "./ChartCard"

export function StoreProfilePage() {
  const { onRequest, error } = useFetch()
  const { user } = userStore()
  const [activeProducts, setActiveProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [monthlyTotal, setMonthlyTotal] = useState(0)

  function sumOrdersTotal() {}

  async function fetchRestaurantOrders() {
    await onRequest({
      request: () => restaurantService.getRestaurantOrders(1),
      onSuccess: (data) => {
        if (error) {
          setOrders([])
        } else {
          function isOrderFromCurrentMonth(orderDate) {
            const currentDate = new Date()
            const currentMonth = currentDate.getMonth()

            const currentYear = currentDate.getFullYear()
            const orderDateObj = new Date(orderDate)
            const orderMonth = orderDateObj.getMonth()
            const orderYear = orderDateObj.getFullYear()

            return currentMonth === orderMonth && currentYear === orderYear
          }

          const filteredByMonthOrders = data.filter((order) =>
            isOrderFromCurrentMonth(order.orderDate)
          )

          setOrders([...filteredByMonthOrders])
          let total = 0
          filteredByMonthOrders.forEach((order) => {
            total += order.totalValue
          })
          setMonthlyTotal(total)
        }
      },
    })
  }

  useEffect(() => {
    async function fetchActiveProducts() {
      await onRequest({
        request: () => restaurantService.getProducts(),
        onSuccess: (data) => {
          let activeProductsByRestaurantId = []
          data.forEach((product) => {
            if (product.restaurantId == user.restaurantId) {
              activeProductsByRestaurantId.push(product)
            }
          })
          setActiveProducts(activeProductsByRestaurantId)
        },
      })
    }

    fetchRestaurantOrders()
    fetchActiveProducts()
  }, [])

  return (
    <div className="flex-grow p-4">
      <main className="mx-auto flex w-full max-w-[1216px] flex-col items-center text-gray-600 antialiased lg:h-auto">
        <div className="mb-5 mt-4 flex w-full flex-col justify-between sm:flex-row">
          <h1 className="mb-4 text-2xl font-semibold md:text-4xl">
            Olá, {user?.fantasy}
          </h1>
        </div>

        <section className="grid w-full grid-cols-12 gap-4 text-xl font-semibold transition-all sm:grid-cols-6 lg:grid-cols-12">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-500">
                  <p>Itens ativos no cardápio</p>
                  <div className="sm:hidden">
                    <IconShoppingCart size={30} />
                  </div>
                  <div className="hidden sm:block">
                    <IconShoppingCart size={40} />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-2xl text-primary sm:text-4xl">
                <p>{activeProducts.length}</p>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 sm:col-span-3 lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-500">
                  <p>Total faturado no mês</p>
                  <div className="sm:hidden">
                    <IconCurrencyDollar size={35} />
                  </div>
                  <div className="hidden sm:block">
                    <IconCurrencyDollar size={40} />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-2xl text-primary sm:text-4xl">
                <p>{currencyFormatter(monthlyTotal)}</p>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 sm:col-span-3 lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-500">
                  <p>Pedidos no mês</p>
                  <div className="sm:hidden">
                    <IconShoppingBag size={35} />
                  </div>
                  <div className="hidden sm:block">
                    <IconShoppingBag size={40} />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-2xl text-primary sm:text-4xl">
                <p>{orders.length}</p>
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
                  <div className="sm:hidden">
                    <IconClockHour4 size={35} />
                  </div>
                  <div className="hidden sm:block">
                    <IconClockHour4 size={40} />
                  </div>
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
                <p className="p-4 text-xl font-semibold">Visão geral</p>
                <ChartCard />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
