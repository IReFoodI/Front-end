import {
  IconClockHour4,
  IconCurrencyDollar,
  IconShoppingBag,
  IconShoppingCart,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"
import { currencyFormatter } from "@/app/utils/currencyFormatter"
import { DAY_OF_WEEK_EN_TO_PT } from "@/app/utils/daysOfWeekENToPT"
import { DAYS_OF_WEEK_ORDER } from "@/app/utils/daysOfWeekOrder"
import userStore from "@/domains/user/stores/userStore"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/components/ui/card"

import { fetchRestaurantHoursById } from "../services/restaurantHoursService"
import { restaurantService } from "../services/restaurantService"
import { FinanceChartCard } from "./FinanceChartCard"

export function StoreProfilePage() {
  const { onRequest, error } = useFetch()
  const { user } = userStore()
  const [activeProducts, setActiveProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [ordersForCurrentMonth, setordersForCurrentMonth] = useState([])
  const [monthlyTotal, setMonthlyTotal] = useState(0)
  const [restaurantHours, setRestaurantHours] = useState([])

  function isOrderFromCurrentMonth(orderDate) {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    const orderDateObj = new Date(orderDate)
    const orderMonth = orderDateObj.getMonth()
    const orderYear = orderDateObj.getFullYear()

    return currentMonth === orderMonth && currentYear === orderYear
  }

  useEffect(() => {
    async function fetchRestaurantOrders() {
      await onRequest({
        request: () => restaurantService.getRestaurantOrders(user.restaurantId),
        onSuccess: (data) => {
          if (error) {
            setordersForCurrentMonth([])
          } else {
            setOrders(data)
            const filteredByMonthOrders = data.filter((order) =>
              isOrderFromCurrentMonth(order.orderDate)
            )

            setordersForCurrentMonth([...filteredByMonthOrders])
            let total = 0
            filteredByMonthOrders.forEach((order) => {
              total += order.totalValue
            })
            setMonthlyTotal(total)
          }
        },
      })
    }

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

    async function fetchRestaurantHours() {
      await onRequest({
        request: () => fetchRestaurantHoursById(user.restaurantId),
        onSuccess: (data) => {
          setRestaurantHours([...data])
        },
      })
    }

    fetchRestaurantHours()
    fetchRestaurantOrders()
    fetchActiveProducts()
    //eslint-disable-next-line
  }, [])

  console.log(restaurantHours)

  return (
    <div className="flex-grow p-4">
      <main className="mx-auto flex w-full max-w-[1216px] flex-col items-center text-gray-600 antialiased lg:h-auto">
        <div className="mb-5 mt-4 flex w-full flex-col justify-between sm:flex-row">
          <h1 className="mb-4 text-base font-semibold md:text-2xl">
            Olá, {user?.name || user?.fantasy}
          </h1>
        </div>

        <section className="grid w-full grid-cols-12 gap-4 text-xl font-semibold transition-all sm:grid-cols-6 lg:grid-cols-12">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <Card className="">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-500">
                  <p>Itens ativos no cardápio</p>
                  <div className="sm:hidden">
                    <IconShoppingCart size={20} />
                  </div>
                  <div className="hidden sm:block">
                    <IconShoppingCart size={30} />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base text-primary sm:text-2xl md:py-3">
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
                    <IconCurrencyDollar size={20} />
                  </div>
                  <div className="hidden sm:block">
                    <IconCurrencyDollar size={30} />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base text-primary sm:text-2xl md:py-3">
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
                    <IconShoppingBag size={20} />
                  </div>
                  <div className="hidden sm:block">
                    <IconShoppingBag size={30} />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base text-primary sm:text-2xl md:py-3">
                <p>{ordersForCurrentMonth.length}</p>
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
                    <IconClockHour4 size={20} />
                  </div>
                  <div className="hidden sm:block">
                    <IconClockHour4 size={30} />
                  </div>
                </CardTitle>
              </CardHeader>
              {restaurantHours.length > 0 ? (
                <CardContent className="flex flex-col gap-6 text-sm text-gray-500">
                  {restaurantHours
                    ?.sort(
                      (a, b) =>
                        DAYS_OF_WEEK_ORDER[a.dayOfWeek] -
                        DAYS_OF_WEEK_ORDER[b.dayOfWeek]
                    )
                    ?.map((item) => (
                      <span
                        key={item.dayOfWeek}
                        className="flex justify-between"
                      >
                        <p>{DAY_OF_WEEK_EN_TO_PT[item.dayOfWeek]}</p>{" "}
                        <p>{`${item?.openingTime || "-"} às ${item?.closingTime || "-"}  `}</p>
                      </span>
                    ))}
                </CardContent>
              ) : (
                <p className="m-6 text-lg text-orange-500">
                  Os horários do restaurante não foram cadastrados!
                </p>
              )}
            </Card>
          </div>
          <div className="col-span-12 flex flex-col gap-5 text-xl font-semibold sm:col-span-6 lg:col-span-8">
            <Card className="col-span-12 sm:col-span-6 lg:col-span-8">
              <CardContent className="ps-1">
                <p className="p-4 text-xl font-semibold">Visão geral</p>
                {orders < 0 ? (
                  <h1>Não existem pedidos feitos!</h1>
                ) : (
                  <FinanceChartCard orders={orders} />
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
