import { IconPaperBag } from "@tabler/icons-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/components/ui/sheet"

import { AccordionsStructure } from "./components/AccordionsStructure"
import { TabsStructure } from "./components/TabsStructure"

export function StoreProfileOrders() {
  const orders = [
    {
      orderId: 1,
      clientName: "João Silva",
      orderNumber: 12345,
      items: [
        { itemId: 1, itemName: "Hambúrguer", price: 20.0 },
        { itemId: 2, itemName: "Refrigerante", price: 5.0 },
      ],
      totalValue: 25.0,
      status: "accepted",
    },
    {
      orderId: 2,
      clientName: "Maria Souza",
      orderNumber: 12346,
      items: [
        { itemId: 1, itemName: "Pizza", price: 30.0 },
        { itemId: 2, itemName: "Suco", price: 7.0 },
      ],
      totalValue: 37.0,
      status: "accepted",
    },
    {
      orderId: 3,
      clientName: "Carlos Lima",
      orderNumber: 12347,
      items: [
        { itemId: 1, itemName: "Sushi", price: 50.0 },
        { itemId: 2, itemName: "Chá Verde", price: 10.0 },
      ],
      totalValue: 60.0,
      status: "accepted",
    },
    {
      orderId: 4,
      clientName: "Carlos Lima",
      orderNumber: 12347,
      items: [
        { itemId: 1, itemName: "Sushi", price: 50.0 },
        { itemId: 2, itemName: "Chá Verde", price: 10.0 },
      ],
      totalValue: 60.0,
      status: "pending",
    },
    {
      orderId: 4,
      clientName: "Carlos Lima",
      orderNumber: 12347,
      items: [
        { itemId: 1, itemName: "Sushi", price: 50.0 },
        { itemId: 2, itemName: "Chá Verde", price: 10.0 },
      ],
      totalValue: 60.0,
      status: "pending",
    },
  ]

  function filterOrders(filter) {
    return orders.filter((order) => order.status == filter)
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div
          className={`flex w-16 flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-primary md:w-20 [&.active]:bg-primary`}
        >
          <IconPaperBag className="h-6 w-6 md:h-10 md:w-10" />
          <p className="text-xs md:text-sm">Pedidos</p>
        </div>
      </SheetTrigger>
      <SheetContent
        side={`left`}
        className="m-0 flex h-full flex-col p-0 [&>button]:hidden"
      >
        <div className="flex-grow overflow-y-auto">
          <TabsStructure
            pendingOrders={filterOrders("pending")}
            scheduledOrders={filterOrders("accepted")}
          />
        </div>
        <AccordionsStructure />
        <SheetHeader>
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
