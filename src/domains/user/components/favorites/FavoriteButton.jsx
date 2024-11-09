import { IconHeart, IconHeartFilled } from "@tabler/icons-react"

import { Button } from "@/ui/components/ui/button/button"

export function FavoriteButton({ isFavorited, onToggle, ...props }) {
  return (
    <Button
      variant="ghost"
      onClick={(e) => {
        onToggle()
      }}
      {...props}
    >
      {isFavorited ? (
        <IconHeartFilled className="size-6 text-[hsl(var(--primary))] sm:size-8" />
      ) : (
        <IconHeart className="size-6 text-[hsl(var(--primary))] sm:size-8" />
      )}
    </Button>
  )
}
