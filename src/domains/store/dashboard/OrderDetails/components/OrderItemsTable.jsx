import { currencyFormatter } from "@/app/utils/currencyFormatter"
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
            <TableCell colSpan={1}>{item.quantity}</TableCell>
            <TableCell colSpan={1}>{item.productName}</TableCell>
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
