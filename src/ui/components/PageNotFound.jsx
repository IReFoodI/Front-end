import { Link } from "react-router-dom"

import imagem from "@/ui/assets/page404.png"
import { Button } from "@/ui/components/ui/button/button"

export function PageNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <img
        src={imagem}
        alt="404 Not Found"
        className="mb-6 w-2/3 md:max-w-screen-sm lg:max-w-[40rem]"
      />
      <h2 className="mb-4 text-2xl font-semibold text-inherit md:text-4xl">
        Página não encontrada
      </h2>

      <Link to="/">
        <Button className="w-full p-4 text-lg">Voltar para home</Button>
      </Link>
    </div>
  )
}
