import { Link } from "react-router-dom"

import imagem from "@/ui/assets/page404.png"

export function PageNotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <img src={imagem} alt="404 Not Found" className="mb-6 w-2/3" />
      <h2 className="mb-4 text-inherit">Página não encontrada</h2>

      <Link
        to="/"
        className="text-lg text-primary underline hover:text-orange-600"
      >
        Voltar para home
      </Link>
    </div>
  )
}
