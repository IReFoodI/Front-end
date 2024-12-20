import {
  Bar,
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

export function FinanceChartCard({ orders }) {
  function getMonthlyOrdersTotal(month) {
    let total = 0

    if (orders.length > 0) {
      orders.forEach((order) => {
        const orderDate = new Date(order.orderDate)
        const monthFromCurrentOrder = orderDate.getMonth()

        if (month == monthFromCurrentOrder) {
          total += order.totalValue
        }
      })
    }

    return total
  }

  const data = [
    {
      name: "Jan",
      total: getMonthlyOrdersTotal(0),
    },
    {
      name: "Fev",
      total: getMonthlyOrdersTotal(1),
    },
    {
      name: "Mar",
      total: getMonthlyOrdersTotal(2),
    },
    {
      name: "Abr",
      total: getMonthlyOrdersTotal(3),
    },
    {
      name: "Mai",
      total: getMonthlyOrdersTotal(4),
    },
    {
      name: "Jun",
      total: getMonthlyOrdersTotal(5),
    },
    {
      name: "Jul",
      total: getMonthlyOrdersTotal(6),
    },
    {
      name: "Ago",
      total: getMonthlyOrdersTotal(7),
    },
    {
      name: "Set",
      total: getMonthlyOrdersTotal(8),
    },
    {
      name: "Out",
      total: getMonthlyOrdersTotal(9),
    },
    {
      name: "Nov",
      total: getMonthlyOrdersTotal(10),
    },
    {
      name: "Dez",
      total: getMonthlyOrdersTotal(11),
    },
  ]

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={data}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `R$${value}`}
        />
        <Bar dataKey={"total"} radius={[4, 4, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
  )
}
