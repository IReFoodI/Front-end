import { currencyFormatter } from "@/app/utils/currencyFormatter"
import { groupItems } from "@/app/utils/OrderUtils"
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
  const items = groupItems(orderItems)

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
        {items?.map((item) => (
          <TableRow
            key={item.itemId}
            className="text-base font-semibold text-gray-500"
          >
            <TableCell colSpan={1}>{item.quantity}</TableCell>
            <TableCell colSpan={1}>{item.itemName}</TableCell>
            <TableCell colSpan={3} className="text-right">
              {currencyFormatter(item.price)}
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
