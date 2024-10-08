import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/ui/select"

export function StyledSelect({ categories, selectedCategory }) {
  return (
    <Select className="w-full border-4 border-zinc-400">
      <SelectTrigger className="w-full">
        <SelectValue placeholder={selectedCategory} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categorias</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.category}>
              {category.category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
