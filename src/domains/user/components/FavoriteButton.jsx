import { IconHeart, IconHeartFilled } from "@tabler/icons-react"

import { Button } from "@/ui/components/ui/button"

export function FavoriteButton({ isFavorited, onToggle, className, ...props }) {
  return (
    <Button
      variant="ghost"
      className={`p-2 ${className}`}
      onClick={onToggle}
      {...props}
    >
      {isFavorited ? (
        <IconHeartFilled className="h-6 w-6 text-[hsl(var(--primary))]" />
      ) : (
        <IconHeart className="h-6 w-6 text-gray-400" />
      )}
    </Button>
  )
}
