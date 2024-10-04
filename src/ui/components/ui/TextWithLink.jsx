import { useNavigate } from "react-router-dom"

import { Button } from "./button/button"



export function TextWithLink({ text, buttonContent, navigateTo }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-wrap items-center justify-center text-xs my-4">
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
