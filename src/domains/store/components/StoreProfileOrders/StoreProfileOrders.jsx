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
      client: {
        clientName: "João Silva",
        clientPhoneNumber: 99999999999,
      },
      orderNumber: 12345,
      items: [
        { itemId: 1, itemName: "Hambúrguer", price: 20.0 },
        { itemId: 2, itemName: "Refrigerante", price: 5.0 },
      ],
      totalValue: 25.0,
      status: "canceled",
      typeOfReceiving: "Retirada",
      timeOfDelivery: {
        day: "02/02/2025",
        initialTime: "19:52",
        finalTime: "20:02",
      },
    },
    {
      orderId: 2,
      client: {
        clientName: "João Silva",
        clientPhoneNumber: 99999999999,
      },
      orderNumber: 12345,
      items: [
        { itemId: 1, itemName: "Hambúrguer", price: 20.0 },
        { itemId: 2, itemName: "Refrigerante", price: 5.0 },
      ],
      totalValue: 25.0,
      status: "accepted",
      typeOfReceiving: "Retirada",
      timeOfDelivery: {
        day: "02/02/2025",
        initialTime: "19:52",
        finalTime: "20:02",
      },
    },
    {
      orderId: 3,
      client: {
        clientName: "João Silva",
        clientPhoneNumber: 99999999999,
      },
      orderNumber: 12345,
      items: [
        { itemId: 1, itemName: "Hambúrguer", price: 20.0 },
        { itemId: 2, itemName: "Refrigerante", price: 5.0 },
      ],
      totalValue: 25.0,
      status: "done",
      typeOfReceiving: "Retirada",
      timeOfDelivery: {
        day: "02/02/2025",
        initialTime: "19:52",
        finalTime: "20:02",
      },
    },
    {
      orderId: 4,
      client: {
        clientName: "João Silva",
        clientPhoneNumber: 99999999999,
      },
      orderNumber: 12345,
      items: [
        { itemId: 1, itemName: "Hambúrguer", price: 20.0 },
        { itemId: 2, itemName: "Refrigerante", price: 5.0 },
        { itemId: 2, itemName: "Refrigerante", price: 5.0 },
      ],
      totalValue: 25.0,
      status: "pending",
      typeOfReceiving: "Retirada",
      timeOfDelivery: {
        day: "02/02/2025",
        initialTime: "19:52",
        finalTime: "20:02",
      },
    },
  ]

  function filterOrders(filter) {
    return orders.filter((order) => order.status == filter)
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex w-16 flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-primary md:w-20 [&.active]:bg-primary">
          <IconPaperBag className="h-6 w-6 md:h-10 md:w-10" />
          <p className="text-xs md:text-sm">Pedidos</p>
        </div>
      </SheetTrigger>
      <SheetContent
        side={`left`}
        className="m-0 flex h-full flex-col gap-0 p-0 lg:gap-0 [&>button]:hidden"
      >
        <div className="flex-grow overflow-y-auto">
          <TabsStructure
            pendingOrders={filterOrders("pending")}
            scheduledOrders={filterOrders("accepted")}
          />
        </div>
        <div className="flex flex-col">
          <AccordionsStructure
            doneOrders={filterOrders("done")}
            canceledOrders={filterOrders("canceled")}
          />
        </div>
        <SheetHeader className="space-y-0">
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
