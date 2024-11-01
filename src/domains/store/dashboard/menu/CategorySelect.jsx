import React from "react"

const categories = ["DOCE", "SALGADO", "MISTO"]

export const CategorySelect = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <select
        value={value}
        onChange={onChange}
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}
