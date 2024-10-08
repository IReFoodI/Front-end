import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/ui/select"

export function SelectYear({ selectedYear, setSelectedYear }) {
  //fazer a requisição para pegar todos os anos que a empresa existe no aplicativo
  //depois salvar em algum lugar e listar no select
  return (
    <Select value={selectedYear} onValueChange={setSelectedYear}>
      <SelectTrigger className="w-28">
        <SelectValue placeholder="Mês" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={selectedYear}>{selectedYear}</SelectItem>
        {/* fazer um map aqui com todos os anos */}
      </SelectContent>
    </Select>
  )
}
