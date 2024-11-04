import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"
import { currencyFormatter } from "@/app/utils/currencyFormatter"
import { groupItems } from "@/app/utils/OrderUtils"
import { restaurantService } from "@/domains/store/services/restaurantService"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/components/ui/table"

export function OrderItemsTable({ orderItems, totalValue }) {
  const [productNames, setProductNames] = useState({})
  const { onRequest } = useFetch()

  useEffect(() => {
    const fetchProductsById = async () => {
      let names = {}

      orderItems?.map(async (item) => {
        const productId = item.productId
        await onRequest({
          request: () => restaurantService.getProductById(productId),
          onSuccess: (data) => {
            names[productId] = data.nameProd
          },
        })
      })
      setProductNames(names)
    }

    fetchProductsById()
  }, [orderItems, onRequest])

  return (
    <Table className="rounded-xl bg-gray-200">
      <TableHeader className="text-sm">
        <TableRow>
          <TableHead colSpan={1}>Quant.</TableHead>
          <TableHead colSpan={1}>Produto</TableHead>
          <TableHead colSpan={3} className="text-right">
            Valor
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orderItems?.map((item) => (
          <TableRow
            key={item.productId}
            className="text-base font-semibold text-gray-500"
          >
            <TableCell colSpan={1}>{item.quantity}</TableCell>
            <TableCell colSpan={1}>
              {productNames[item.productId] || "Carregando..."}
            </TableCell>
            <TableCell colSpan={3} className="text-right">
              {currencyFormatter(item.subtotal)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow className="text-lg font-semibold text-gray-900">
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell colSpan={3} className="text-right">
            {currencyFormatter(totalValue)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
