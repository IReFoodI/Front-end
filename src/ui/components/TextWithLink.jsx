import { useNavigate } from "react-router-dom"

import { Button } from "./ui/button/button"

export function TextWithLink({ text, buttonContent, navigateTo, style }) {
  const navigate = useNavigate()
  return (
    <div
      className={`flex flex-wrap items-center justify-center text-xs ${style}`}
    >
      <p className="text-muted-foreground">{text}</p>{" "}
      <Button
        variant={"link"}
        className={"p-0 pl-1 text-xs"}
        onClick={() => navigate(navigateTo)}
      >
        {buttonContent}
      </Button>
    </div>
  )
}
