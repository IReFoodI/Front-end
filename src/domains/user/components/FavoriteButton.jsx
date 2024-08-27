import { Button } from "@/ui/components/ui/button";
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

export function FavoriteButton({ isFavorited, onToggle, className, ...props }) {
  return (
    <Button
      variant="ghost"
      className={`p-2 ${className}`}
      onClick={onToggle}
      {...props}
    >
      {isFavorited ? (
        <IconHeartFilled className="text-[hsl(var(--primary))] w-6 h-6" />
      ) : (
        <IconHeart className="text-gray-400 w-6 h-6" />
      )}
    </Button>
  );
}
