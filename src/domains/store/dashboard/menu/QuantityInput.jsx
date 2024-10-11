import { useState } from "react"

import { Button } from "@/ui/components/ui/button/button"
import { Input } from "@/ui/components/ui/input"

export function QuantityInput({ items }) {
  const [quantity, setQuantity] = useState(items)

  const handleDecrement = () => {
    if (quantity > 0) setQuantity(quantity - 1)
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        onClick={handleDecrement}
        disabled={quantity <= 0}
        className="pr-0 text-xl"
      >
        -
      </Button>
      <Input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="[&::-moz-appearance]:textfield w-16 appearance-none p-0 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        min={0}
      />
      <Button
        variant="ghost"
        onClick={handleIncrement}
        className="pl-0 text-xl"
      >
        +
      </Button>
    </div>
  )
}
