import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/components/ui/accordion"

import { OrdersList } from "./OrdersList"

export function AccordionsStructure({ doneOrders, canceledOrders, setOrder }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="done" className="w-full flex-grow overflow-hidden">
        <AccordionTrigger className="border-b-2 border-gray-400 bg-zinc-300 p-4 font-semibold text-zinc-800">
          Concluídos
          <p>
            {doneOrders.length +
              " " +
              `${doneOrders.length == 1 ? "pedido" : "pedidos"}`}
          </p>
        </AccordionTrigger>
        <AccordionContent className="max-h-60 overflow-y-auto">
          <OrdersList
            orders={doneOrders}
            isDoneOrCanceled={true}
            setOrder={setOrder}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="canceled"
        className="w-full flex-grow overflow-hidden"
      >
        <AccordionTrigger className="border-b-2 border-gray-400 bg-zinc-300 p-4 font-semibold text-zinc-800">
          Cancelados
          <p>
            {canceledOrders.length +
              " " +
              `${canceledOrders.length == 1 ? "pedido" : "pedidos"}`}
          </p>
        </AccordionTrigger>
        <AccordionContent className="max-h-60 overflow-y-auto">
          <OrdersList
            orders={canceledOrders}
            isDoneOrCanceled={true}
            setOrder={setOrder}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
