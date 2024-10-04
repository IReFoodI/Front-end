import { IconEye, IconEyeClosed } from "@tabler/icons-react"
import * as React from "react"

import { cn } from "@/app/utils/cn"

const PasswordInput = React.forwardRef(
  (
    { className, fieldName, passwordVisibility, setPasswordVisibility, ...props },
    ref
  ) => {
    
    const togglePasswordVisibility = () => {
      setPasswordVisibility((prevState) => ({
        ...prevState,
        [fieldName]: !prevState[fieldName],
      }))
    }

    return (
      <div className="relative">
        <input
          type={passwordVisibility ? "text" : "password"}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-background px-1">
          <button type="button" onClick={togglePasswordVisibility}>
            {passwordVisibility ? <IconEye /> : <IconEyeClosed />}
          </button>
        </div>
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
