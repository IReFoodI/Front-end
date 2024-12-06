import { IconLoader2 } from "@tabler/icons-react"

import { cn } from "@/app/utils/cn"

export function Loading({ classname, iconClassname }) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-1 items-center justify-center",
        classname
      )}
      data-testid="loading"
    >
      <IconLoader2
        className={cn(
          "size-8 animate-spin text-primary lg:size-10",
          iconClassname
        )}
      />
    </div>
  )
}
