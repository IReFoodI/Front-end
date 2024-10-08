import { useNavigate } from "react-router-dom"

import { Button } from "./button/button"



export function TextWithLink({ text, buttonContent, navigateTo }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-wrap items-center justify-center text-xs">
      <p className="text-muted-foreground">{text}</p>{" "}
      <Button
        variant={"link"}
        className={"p-0 pl-1  text-xs h-4"}
        onClick={() => navigate(navigateTo)}
      >
        {buttonContent}
      </Button>
    </div>
  )
}
