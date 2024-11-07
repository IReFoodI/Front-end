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
            <TableCell colSpan={1}>{item.itemQuantity}</TableCell>
            <TableCell colSpan={1}>{item.nameProd}</TableCell>
            <TableCell colSpan={3} className="text-right">
              {currencyFormatter(item.itemSubtotal)}
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
