import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/components/ui/accordion"

export function AccordionsStructure() {
  return (
    <Accordion type="single" collapsible className="flex-shrink-0">
      <AccordionItem value="done">
        <AccordionTrigger>Concluídos</AccordionTrigger>
        <AccordionContent>Teste de concluídos</AccordionContent>
      </AccordionItem>
      <AccordionItem value="canceled">
        <AccordionTrigger>Cancelados</AccordionTrigger>
        <AccordionContent>Teste de cancelados</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
