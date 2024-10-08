import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

import { cn } from "@/app/utils/cn"

import { buttonVariants } from "./buttonVariants"

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }