import { useState } from "react"

import { Input } from "@/ui/components/ui/input"

export function QuantityInput({ items }) {
  const [quantity, setQuantity] = useState(items)

  // const handleDecrement = () => {
  //   if (quantity > 0) setQuantity(quantity - 1)
  // }

  // const handleIncrement = () => {
  //   setQuantity(quantity + 1)
  // }

  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="[&::-moz-appearance]:textfield w-16 appearance-none p-0 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        min={0}
      />
    </div>
  )
}
