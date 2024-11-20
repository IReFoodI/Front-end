import { Link } from "react-router-dom"

import { Button } from "@/ui/components/ui/button/button"

export function NotFound({ Icon, title, description, linkTo, textButton }) {
  return (
    <section className="flex h-screen/2 items-center justify-center">
      <div className="flex flex-col items-center space-y-4 text-center">
        <Icon className="h-12 w-12 text-gray-400" />
        <h1 className="text-lg font-bold text-primary">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
        {textButton && (
          <Link to={linkTo} className="w-full">
            <Button className="rounded-md bg-primary px-6 py-4 text-primary-foreground shadow hover:bg-primary/90">
              {textButton}
            </Button>
          </Link>
        )}
      </div>
    </section>
  )
}
