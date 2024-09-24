import { useNavigate } from "react-router-dom"

import { Button } from "@/ui/components/ui/button"

export function TextWithLink({ text, buttonContent, navigateTo }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-wrap items-center justify-center text-xs">
      <p className="text-muted-foreground">{text}</p>{" "}
      <Button
        variant={"link"}
        className={"pl-1 text-xs"}
        onClick={() => navigate(navigateTo)}
      >
        {buttonContent}
      </Button>
    </div>
  )
}
