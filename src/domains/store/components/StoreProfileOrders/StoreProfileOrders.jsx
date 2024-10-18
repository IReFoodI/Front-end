import { AccordionsStructure } from "./components/AccordionsStructure"
import { TabsStructure } from "./components/TabsStructure"

export function StoreProfileOrders({ setOrder }) {
  const orders = [
    {
      orderId: 1,
      client: {
        clientName: "Marcos Daniel ",
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
      payment: "Pix",
      paymentStatus: "aprovado",
    },
    {
      orderId: 2,
      client: {
        clientName: "Yasmin Carloto",
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
      payment: "Pix",
      paymentStatus: "aprovado",
    },
    {
      orderId: 3,
      client: {
        clientName: "Ingryd Duarte",
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
      payment: "Pix",
      paymentStatus: "aprovado",
    },
    {
      orderId: 4,
      client: {
        clientName: "Teste da Silva",
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
      payment: "Pix",
      paymentStatus: "aprovado",
    },
  ]

  function filterOrders(filter) {
    return orders.filter((order) => order.status == filter)
  }

  return (
    <div className="flex h-full flex-col bg-slate-100 shadow-right lg:w-1/3">
      <div className="flex-grow overflow-y-auto">
        <TabsStructure
          pendingOrders={filterOrders("pending")}
          scheduledOrders={filterOrders("accepted")}
          setOrder={setOrder}
        />
      </div>
      <div className="flex flex-col">
        <AccordionsStructure
          doneOrders={filterOrders("done")}
          canceledOrders={filterOrders("canceled")}
          setOrder={setOrder}
        />
      </div>
    </div>
  )
}
