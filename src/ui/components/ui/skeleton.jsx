import { cn } from "@/app/utils/cn"

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("bg-primary/10 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
